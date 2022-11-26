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
  gameStarted: boolean;
};

type Actions = {
  // Player actions:
  increasePlayerScore: (playerId: number) => void;
  setNames: (playerNames: string[]) => void;
  toggleTurn: () => void;
  resetStore: () => void;
  resetScores: () => void;
  stopGame: () => void;
  startGame: () => void;

  // Card actions:
  setCards: (cards: ICard[]) => void;
  fetchCards: () => void;
  shuffleCards: () => void;
  setCardsMatched: (card1: ICard, card2: ICard) => void;
};

type MemoryState = Store & Actions;

type MyPersist = (
  config: StateCreator<MemoryState>,
  options: PersistOptions<MemoryState>,
) => StateCreator<MemoryState>;

// Initialize state initial:
const initialMemoryState = {
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
};

export const useMemoryStore = create<MemoryState>(
  (persist as MyPersist)(
    (set) => ({
      // spread the initial state:
      ...initialMemoryState,

      // increse the score:
      increasePlayerScore: (playerId: number) => {
        set((state) => ({
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
          players: [
            { ...state.players[0], name: playerNames[0] },
            { ...state.players[1], name: playerNames[1] },
          ],
        }));
      },

      // toggle player turn:
      toggleTurn: () => {
        set((state) => ({
          players: state.players.map((player) => ({
            ...player,
            turnToPlay: !player.turnToPlay,
          })),
        }));
      },

      // toggle stop game:
      startGame: () => {
        set((state) => ({
          gameStarted: true,
        }));
      },

      // toggle stop game:
      stopGame: () => {
        set((state) => ({
          gameStarted: false,
        }));
      },

      // reset player scores when restarting game:
      resetScores: () => {
        set((state) => ({
          players: state.players.map((player) => ({
            ...player,
            score: 0,
          })),
        }));
      },

      // shuffle cards:
      shuffleCards: () => {
        set((state) => ({
          cards: ShuffleCards(state.cards),
        }));
      },

      // set all cards:
      setCards: (arrCards: ICard[]) => {
        set({ cards: [...arrCards] });
      },

      // set matching cards:
      setCardsMatched: (card1: ICard, card2: ICard) => {
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === card1.id || card.id === card2.id
              ? { ...card, matched: true }
              : card,
          ),
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
        const orderedCards = StripCardDetails(allCards.data);

        // Shuffle the cards:
        const cards = ShuffleCards(orderedCards);

        set({
          cards: [...cards],
        });
      },

      // reset the values of the store:
      resetStore: () => {
        set(initialMemoryState);
      },
    }),

    { name: "memory-store", getStorage: () => sessionStorage },
  ),
);
