import create, { StateCreator } from "zustand";

import AvatarPlayer1 from "@/assets/Player1.png";
import AvatarPlayer2 from "@/assets/Player2.png";
import { StaticImageData } from "next/image";
import { persist, PersistOptions } from "zustand/middleware";
import { ICard } from "components/Card";
import { ShuffleCards } from "utils/ShuffleCards";
import { GAME_DELAYS, GAME_RULES } from "utils/gameConfig";

import { fetchCardsFromCMS } from "utils/contentfulCMS";

export type TPlayer = {
  id: number;
  name: string | null;
  score: number;
  avatar: StaticImageData;
  turnToPlay: boolean;
};

// typings for our store:
type Store = {
  players: TPlayer[];
  cards: ICard[];
  selectedCards: ICard[];
  gameStarted: boolean;
  cardsMatchFound: boolean;
  winnersList: TPlayer[];
  winnerFound: boolean;
};

type Actions = {
  // Player actions:
  increasePlayerScore: (playerId: number) => void;
  setNames: (player1: string, player2: string) => void;
  toggleTurn: () => void;
  resetStore: () => void;
  resetScores: () => void;
  stopGame: () => void;
  startGame: () => void;
  restartGame: () => void;

  // Card actions:
  setCards: (cards: ICard[]) => void;
  fetchCards: () => void;
  shuffleCards: () => void;
  clearSelectedCards: () => void;
  announceWinner: (bAnnounce: boolean) => void;
  setCardsMatched: (card1: ICard, card2: ICard) => void;
  removeCardsMatchedDialog: () => void;
  generateWinnersList: (players: TPlayer[]) => void;
  addSelectedCard: (card: ICard) => void;
  resetCardsProperties: () => void;
  flipSelectedCard: (card1: ICard) => void;
  cardIsFlipped: (card1: ICard) => boolean;
  flashDisplayCards: () => void;
  removeFlashDisplayCards: () => void;
};

type MemoryState = Store & Actions;

type MyPersist = (
  config: StateCreator<MemoryState>,
  options: PersistOptions<MemoryState>
) => StateCreator<MemoryState>;

let restartGameTimer: ReturnType<typeof setTimeout> | null = null;

// Initialize state initial:
const initialMemoryState: Store = {
  players: [
    {
      id: 1,
      name: null,
      score: 0,
      avatar: AvatarPlayer1,
      turnToPlay: true,
    },
    {
      id: 2,
      name: null,
      score: 0,
      avatar: AvatarPlayer2,
      turnToPlay: false,
    },
  ] as TPlayer[],
  cards: [] as ICard[],
  gameStarted: false,
  selectedCards: [] as ICard[],
  cardsMatchFound: false,
  winnerFound: false,
  winnersList: [] as TPlayer[],
};

export const useMemoryStore = create<MemoryState>(
  (persist as MyPersist)(
    (set, get) => ({
      // spread the initial state:
      ...initialMemoryState,

      // increse the score:
      increasePlayerScore: (playerId: number) => {
        set((state) => ({
          ...state,
          players: state.players.map((player) =>
            player.id === playerId
              ? { ...player, score: player.score + 1 }
              : player
          ),
        }));
      },

      // Set the name of the players:
      setNames: (player1: string, player2: string) => {
        set((state) => ({
          ...state,
          players: [
            { ...state.players[0], name: player1 },
            { ...state.players[1], name: player2 },
          ],
        }));
      },

      // toggle player turn:
      toggleTurn: () => {
        set((state) => ({
          ...state,
          players: state.players.map((player) => ({
            ...player,
            turnToPlay: !player.turnToPlay,
          })),
        }));
      },

      // toggle stop game:
      startGame: () => {
        set((state) => ({
          ...state,
          gameStarted: true,
        }));
      },

      // toggle stop game:
      stopGame: () => {
        if (restartGameTimer) {
          clearTimeout(restartGameTimer);
          restartGameTimer = null;
        }

        set((state) => ({
          ...state,
          gameStarted: false,
        }));
      },

      // restart stop game:
      restartGame: () => {
        if (restartGameTimer) {
          clearTimeout(restartGameTimer);
        }

        // stop the game:
        get().stopGame();

        // remove announce winner:
        get().announceWinner(false);

        // reset the store:
        get().resetStore();

        // shuffle the cards a couple of times:
        for (let index = 0; index < GAME_RULES.SHUFFLE_ITERATIONS; index += 1) {
          get().shuffleCards();
        }

        // flash the cards for players to memorise upon starting:
        get().flashDisplayCards();

        restartGameTimer = setTimeout(() => {
          get().removeFlashDisplayCards();
          // start the game:
          get().startGame();
          restartGameTimer = null;
        }, GAME_DELAYS.MEMORIZE_CARDS_MS);
      },

      clearSelectedCards: () => {
        // reset the flipped property and clear the selected cards:
        set((state) => {
          const selectedCardIds = new Set(
            state.selectedCards.map((selectedCard) => selectedCard.id)
          );

          return {
            ...state,
            // support clearing any number of selected cards.
            cards: state.cards.map((card) => {
              if (selectedCardIds.has(card.id) && card.matched === false) {
                return { ...card, flipped: false };
              }

              return card;
            }),
            selectedCards: [] as ICard[],
          };
        });
      },

      cardIsFlipped: (card1: ICard): boolean => {
        // find the specific card:
        const findCard = get().cards.find((card) => card.id === card1.id);

        return findCard?.flipped ?? false;
      },

      flashDisplayCards: () => {
        set((state) => ({
          ...state,
          cards: state.cards.map((card) => ({ ...card, flipped: true })),
        }));
      },

      removeFlashDisplayCards: () => {
        set((state) => ({
          ...state,
          cards: state.cards.map((card) => ({ ...card, flipped: false })),
        }));
      },

      flipSelectedCard: (card1: ICard) => {
        // flipped the selected cards:
        set((state) => ({
          ...state,
          cards: state.cards.map((card) =>
            card.id === card1.id ? { ...card, flipped: true } : card
          ),
        }));
      },

      // reset player scores when restarting game:
      resetScores: () => {
        set((state) => ({
          ...state,
          players: state.players.map((player) => ({
            ...player,
            score: 0,
          })),
        }));
      },

      // shuffle cards:
      shuffleCards: () => {
        set((state) => ({
          ...state,
          cards: [...ShuffleCards(state.cards)],
        }));
      },

      // set all cards:
      setCards: (arrCards: ICard[]) => {
        set((state) => ({ ...state, cards: [...arrCards] }));
      },

      // set matching cards:
      setCardsMatched: (card1: ICard, card2: ICard) => {
        set((state) => ({
          ...state,
          cards: state.cards.map((card) =>
            card.id === card1.id || card.id === card2.id
              ? { ...card, matched: true, flipped: true }
              : card
          ),
          cardsMatchFound: true,
        }));
      },

      // asynchronously fetch cards from CMS:
      fetchCards: async () => {
        const processedCards = await fetchCardsFromCMS();

        set((state) => ({
          ...state,
          cards: [...processedCards],
        }));
      },

      removeCardsMatchedDialog: () => {
        set((state) => ({
          ...state,
          cardsMatchFound: false,
        }));
      },

      announceWinner: (bAnnounce: boolean) => {
        set((state) => ({
          ...state,
          winnerFound: bAnnounce,
        }));
      },

      resetCardsProperties: async () => {
        // reset the matched properties:
        const defaultCards: ICard[] = get().cards?.map((card) => ({
          ...card,
          matched: false,
        }));

        // clear the selected cards:
        get().clearSelectedCards();

        set((state) => ({
          ...state,
          cards: [...defaultCards],
        }));
      },

      addSelectedCard: (card: ICard) => {
        set((state) => {
          if (
            state.selectedCards.length >= GAME_RULES.REQUIRED_SELECTED_CARDS
          ) {
            return state;
          }

          if (
            state.selectedCards.some(
              (selectedCard) => selectedCard.id === card.id
            )
          ) {
            return state;
          }

          const boardCard = state.cards.find(
            (existingCard) => existingCard.id === card.id
          );

          if (!boardCard || boardCard.flipped || boardCard.matched) {
            return state;
          }

          return {
            ...state,
            cards: state.cards.map((existingCard) =>
              existingCard.id === card.id
                ? { ...existingCard, flipped: true }
                : existingCard
            ),
            selectedCards: [...state.selectedCards, card],
          };
        });
      },

      generateWinnersList: (players: TPlayer[]) => {
        // sort the players according to their scores:
        const arrWinners: TPlayer[] = [...players].sort(
          (a, b) => b.score - a.score
        );

        set((state) => ({
          ...state,
          winnerFound: true,
          winnersList: [...arrWinners],
        }));
      },

      // reset the values of the store:
      resetStore: () => {
        // capture the existing names:
        const player1Name = get().players[0].name;
        const player2Name = get().players[1].name;
        const resetCards = get().cards.map((card) => ({
          ...card,
          matched: false,
          flipped: false,
        }));

        if (restartGameTimer) {
          clearTimeout(restartGameTimer);
          restartGameTimer = null;
        }

        set(() => ({
          ...initialMemoryState,
          players: [
            { ...initialMemoryState.players[0], name: player1Name },
            { ...initialMemoryState.players[1], name: player2Name },
          ],
          cards: resetCards,
        }));
      },
    }),

    { name: "memory-store", getStorage: () => sessionStorage }
  )
);
