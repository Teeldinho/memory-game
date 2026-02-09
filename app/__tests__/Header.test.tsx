import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from "../Header";
import { useMemoryStore } from "store/store";

const mockPush = jest.fn();

let mockPathname = "/";

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Header", () => {
  beforeEach(() => {
    mockPathname = "/";
    mockPush.mockReset();

    useMemoryStore.setState((state) => ({
      ...state,
      gameStarted: false,
      winnerFound: false,
    }));
  });

  it("hides exit button on home before game start", () => {
    render(<Header />);

    expect(
      screen.queryByRole("button", { name: "Exit Game" })
    ).not.toBeInTheDocument();
  });

  it("shows exit button on game route", () => {
    mockPathname = "/game";

    render(<Header />);

    expect(
      screen.getByRole("button", { name: "Exit Game" })
    ).toBeInTheDocument();
  });

  it("shows restart button only when game is started", () => {
    mockPathname = "/game";

    useMemoryStore.setState((state) => ({
      ...state,
      gameStarted: true,
    }));

    render(<Header />);

    expect(
      screen.getByRole("button", { name: "Restart Game" })
    ).toBeInTheDocument();
  });

  it("navigates to home when exit is clicked", async () => {
    mockPathname = "/game";
    const user = userEvent.setup();

    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Exit Game" }));

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
