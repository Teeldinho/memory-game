import create, { StateCreator } from "zustand";

import AvatarPlayer1 from "@/assets/Player1.png";
import AvatarPlayer2 from "@/assets/Player2.png";
import { StaticImageData } from "next/image";
import { persist, PersistOptions } from "zustand/middleware";
import { ICard } from "components/Card";
import { ShuffleCards } from "utils/ShuffleCards";
import { StripCardDetails } from "utils/StripCardDetails";

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
  setNames: (playerNames: string[]) => void;
  toggleTurn: () => void;
  resetStore: (names?: string[]) => void;
  resetScores: () => void;
  stopGame: () => void;
  startGame: () => void;

  // Card actions:
  setCards: (cards: ICard[]) => void;
  fetchCards: () => void;
  shuffleCards: () => void;
  announceWinner: (bAnnounce: boolean) => void;
  setCardsMatched: (card1: ICard, card2: ICard) => void;
  removeCardsMatchedDialog: () => void;
  generateWinnersList: (players: TPlayer[]) => void;
  resetCardsProperties: (cards: ICard[]) => void;
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
  winnersList: [],
};

export const useMemoryStore = create<MemoryState>(
  (persist as MyPersist)(
    (set) => ({
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
      setNames: (playerNames: string[]) => {
        set((state) => ({
          ...state,
          players: [
            { ...state.players[0], name: playerNames[0] },
            { ...state.players[1], name: playerNames[1] },
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
          cards: ShuffleCards(state.cards),
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
          cards: [
            ...state.cards.map((card) =>
              card.id === card1.id || card.id === card2.id
                ? { ...card, matched: true }
                : card,
            ),
          ],
          cardsMatchFound: true,
        }));
      },

      // asynchronously fetch cards from CMS:
      fetchCards: async () => {
        const cardsArrayWithAllInformation = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/cards?populate=*`,
        );

        // Promise:
        const allCards = await cardsArrayWithAllInformation.json();

        // Capture data that is needed from the card:
        const processedCards = StripCardDetails(allCards.data);

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

      resetCardsProperties: (cards: ICard[]) => {
        const defaultCards: ICard[] = cards.map((card) => ({
          ...card,
          matched: false,
        }));

        set((state) => ({
          ...state,
          cards: [...defaultCards],
        }));
      },

      generateWinnersList: (players: TPlayer[]) => {
        // sort the players according to their scores:
        const arrWinners: TPlayer[] = [...players].sort(
          (a, b) => a.score - b.score,
        );

        set((state) => ({
          ...state,
          winnerFound: true,
          winnersList: [...arrWinners],
        }));
      },

      // reset the values of the store:
      resetStore: (names?: string[]) => {
        if (names) {
          // we reset the whole store excluding names: (restart game):
          set((state) => ({
            ...initialMemoryState,
            cards: [...state.cards],
            players: [
              { ...initialMemoryState.players[0], name: names[0] },
              { ...initialMemoryState.players[1], name: names[1] },
            ],
          }));
        } else {
          // reset the entire state: (exit game):
          set(initialMemoryState);
        }
      },
    }),

    { name: "memory-store", getStorage: () => sessionStorage },
  ),
);
