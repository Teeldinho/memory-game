import create from "zustand";

import AvatarPlayer1 from "@/assets/Player1.png";
import AvatarPlayer2 from "@/assets/Player2.png";
import { StaticImageData } from "next/image";
import { player1 } from "data/PlayerData";

export type TPlayer = {
  id: number;
  name: string | null;
  score: number;
  avatar: StaticImageData;
  turnToPlay: boolean;
};

// typings for our store:
type MemoryStore = {
  players: TPlayer[];
};

type Actions = {
  increasePlayerScore: (playerId: number) => void;
  setNames: (playerNames: string[]) => void;
  toggleTurn: () => void;
  resetStore: () => void;
};

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
};

export const useMemoryStore = create<MemoryStore & Actions>((set) => ({
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

  // reset the values of the store:
  resetStore: () => {
    set(initialMemoryState);
  },
}));
