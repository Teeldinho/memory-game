import create, { StateCreator } from "zustand";

import AvatarPlayer1 from "@/assets/Player1.png";
import AvatarPlayer2 from "@/assets/Player2.png";
import { StaticImageData } from "next/image";
import { persist, PersistOptions } from "zustand/middleware";
import { ICard } from "components/Card";
import { ShuffleCards } from "utils/ShuffleCards";

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
  options: PersistOptions<MemoryState>,
) => StateCreator<MemoryState>;

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
              : player,
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
        set((state) => ({
          ...state,
          gameStarted: false,
        }));
      },

      // restart stop game:
      restartGame: () => {
        // stop the game:
        get().stopGame();

        // remove announce winner:
        get().announceWinner(false);

        // reset the store:
        get().resetStore();

        // shuffle the cards:
        get().shuffleCards();

        // flash the cards for players to memorise upon starting:
        get().flashDisplayCards();

        setTimeout(() => {
          get().removeFlashDisplayCards();
          // start the game:
          get().startGame();
        }, 5000);
      },

      clearSelectedCards: () => {
        // reset the flipped property and clear the selected cards:
        set((state) => ({
          ...state,
          cards: state.cards.map((card) =>
            card.id === get().selectedCards[0]?.id ||
            card.id === get().selectedCards[1]?.id
              ? { ...card, flipped: false }
              : card,
          ),
          selectedCards: [] as ICard[],
        }));
      },

      cardIsFlipped: (card1: ICard): boolean => {
        // filter and find the specific card:
        const findCard = get().cards.filter((card) => card.id === card1.id);

        return findCard[0]?.flipped;
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
            card.id === card1.id ? { ...card, flipped: true } : card,
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
              : card,
          ),
          cardsMatchFound: true,
        }));
      },

      // asynchronously fetch cards from CMS:
      fetchCards: async () => {
        const processedCards = await fetchCardsFromCMS();

        while (get().cards.length > 0) {
          // remove all items in cards array:
          get().cards.pop();
        }

        console.log("Bana ba");
        console.log(get().cards);

        set((state) => ({
          ...state,
          cards: [...processedCards],
        }));

        console.log("Cardies");
        console.log(get().cards);
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
        set((state) => ({
          ...state,
          selectedCards: [...state.selectedCards, card],
        }));
      },

      generateWinnersList: (players: TPlayer[]) => {
        // sort the players according to their scores:
        const arrWinners: TPlayer[] = [...players].sort(
          (a, b) => b.score - a.score,
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
        let player1Name = get().players[0].name;
        let player2Name = get().players[1].name;

        // reset card properties and score without fetching them from CMS:
        get().resetCardsProperties();
        get().resetScores();

        // reset the entire state: (exit game):
        set((state) => ({
          initialMemoryState,
          players: [
            { ...state.players[0], name: player1Name },
            { ...state.players[1], name: player2Name },
          ],
        }));
      },
    }),

    { name: "memory-store", getStorage: () => sessionStorage },
  ),
);
