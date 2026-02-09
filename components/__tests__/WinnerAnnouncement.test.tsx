import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import WinnerAnnouncement from "../WinnerAnnouncement";
import { useMemoryStore } from "store/store";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("WinnerAnnouncement", () => {
  beforeEach(() => {
    mockPush.mockReset();

    useMemoryStore.setState((state) => ({
      ...state,
      players: [
        { ...state.players[0], name: "Alice", score: 3, turnToPlay: true },
        { ...state.players[1], name: "Bob", score: 1, turnToPlay: false },
      ],
      winnersList: [
        { ...state.players[0], name: "Alice", score: 3, turnToPlay: true },
        { ...state.players[1], name: "Bob", score: 1, turnToPlay: false },
      ],
      winnerFound: true,
      gameStarted: true,
    }));
  });

  it("exits to home and resets winner state", async () => {
    const user = userEvent.setup();

    render(<WinnerAnnouncement />);
    await user.click(screen.getByRole("button", { name: "Exit Game" }));

    expect(mockPush).toHaveBeenCalledWith("/");
    expect(useMemoryStore.getState().winnerFound).toBe(false);
  });
});
