import { act } from "@testing-library/react";

import type { ICard } from "components/Card";
import { GAME_DELAYS } from "utils/gameConfig";

import { useMemoryStore } from "../store";

const TEST_PLAYER_ONE_NAME = "Player One";
const TEST_PLAYER_TWO_NAME = "Player Two";

const TEST_CARDS: ICard[] = [
  {
    id: "card-1",
    name: "Ace",
    symbol: "A",
    color: "red",
    image: "https://images.ctfassets.net/placeholder/card-ace-1.png",
    flipped: false,
    matched: false,
  },
  {
    id: "card-2",
    name: "Ace",
    symbol: "A",
    color: "red",
    image: "https://images.ctfassets.net/placeholder/card-ace-2.png",
    flipped: false,
    matched: false,
  },
  {
    id: "card-3",
    name: "King",
    symbol: "K",
    color: "black",
    image: "https://images.ctfassets.net/placeholder/card-king-1.png",
    flipped: false,
    matched: false,
  },
];

const resetStoreState = () => {
  act(() => {
    const store = useMemoryStore.getState();

    store.setCards(TEST_CARDS);
    store.setNames(TEST_PLAYER_ONE_NAME, TEST_PLAYER_TWO_NAME);
    store.announceWinner(false);
    store.stopGame();
    store.resetStore();
  });
};

describe("memory store game flow", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    sessionStorage.clear();
    resetStoreState();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("starts the game after memorization delay on restart", () => {
    act(() => {
      useMemoryStore.getState().restartGame();
    });

    expect(useMemoryStore.getState().gameStarted).toBe(false);

    act(() => {
      jest.advanceTimersByTime(GAME_DELAYS.MEMORIZE_CARDS_MS);
    });

    expect(useMemoryStore.getState().gameStarted).toBe(true);
  });

  it("resetStore keeps names but resets winner and scores", () => {
    act(() => {
      const store = useMemoryStore.getState();

      store.increasePlayerScore(1);
      store.announceWinner(true);
      store.resetStore();
    });

    const state = useMemoryStore.getState();

    expect(state.winnerFound).toBe(false);
    expect(state.players[0].name).toBe(TEST_PLAYER_ONE_NAME);
    expect(state.players[1].name).toBe(TEST_PLAYER_TWO_NAME);
    expect(state.players[0].score).toBe(0);
    expect(state.players[1].score).toBe(0);
  });

  it("resetStore clears card match and flip flags", () => {
    act(() => {
      const store = useMemoryStore.getState();

      store.setCards(
        TEST_CARDS.map((card) => ({
          ...card,
          flipped: true,
          matched: true,
        }))
      );

      store.resetStore();
    });

    const allCardsReset = useMemoryStore.getState().cards.every((card) => {
      return card.flipped === false && card.matched === false;
    });

    expect(allCardsReset).toBe(true);
  });

  it("does not allow selecting more than two cards", () => {
    act(() => {
      const store = useMemoryStore.getState();

      store.setCards(TEST_CARDS);
      store.addSelectedCard(TEST_CARDS[0]);
      store.addSelectedCard(TEST_CARDS[1]);
      store.addSelectedCard(TEST_CARDS[2]);
    });

    const state = useMemoryStore.getState();
    const thirdCard = state.cards.find((card) => card.id === TEST_CARDS[2].id);

    expect(state.selectedCards).toHaveLength(2);
    expect(thirdCard?.flipped).toBe(false);
  });
});
