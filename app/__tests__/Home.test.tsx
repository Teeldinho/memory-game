import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "../page";
import { useMemoryStore } from "store/store";

const mockPush = jest.fn();
const mockStartGame = jest.fn();
const mockResetStore = jest.fn();
const mockFetchCards = jest.fn();
const mockSetNames = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Home page form", () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockStartGame.mockReset();
    mockResetStore.mockReset();
    mockFetchCards.mockReset();
    mockSetNames.mockReset();

    useMemoryStore.setState((state) => ({
      ...state,
      startGame: mockStartGame,
      resetStore: mockResetStore,
      fetchCards: mockFetchCards,
      setNames: mockSetNames,
    }));
  });

  it("shows required messages when submitting empty names", async () => {
    const user = userEvent.setup();

    render(<Home />);
    await user.click(screen.getByRole("button", { name: "Let's Play" }));

    expect(
      await screen.findByText("Player 1 name is required.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Player 2 name is required.")
    ).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("submits and navigates when both names are provided", async () => {
    const user = userEvent.setup();

    render(<Home />);

    await user.type(screen.getByPlaceholderText("Name of Player 1"), "Alice");
    await user.type(screen.getByPlaceholderText("Name of Player 2"), "Bob");
    await user.click(screen.getByRole("button", { name: "Let's Play" }));

    expect(mockSetNames).toHaveBeenCalledWith("Alice", "Bob");
    expect(mockResetStore).toHaveBeenCalled();
    expect(mockStartGame).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/game");
  });
});
