"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemoryStore } from "store/store";
import shallow from "zustand/shallow";

const Header = () => {
  const {
    storeStopGame,
    storeHasGameStarted,
    storeResetStore,
    storeRestartGame,
  } = useMemoryStore(
    (state) => ({
      storeStopGame: state.stopGame,
      storeRestartGame: state.restartGame,
      storeResetStore: state.resetStore,
      storeHasGameStarted: state.gameStarted,
    }),
    shallow
  );

  // router for navigating pages:
  const router = useRouter();
  const pathname = usePathname();

  const shouldShowRestartButton = pathname === "/game" && storeHasGameStarted;
  const shouldShowExitButton = pathname !== "/" || storeHasGameStarted;

  const handleExitGame = () => {
    // stop the game, reset store and redirect to home screen:
    storeStopGame();
    storeResetStore();
    router.push("/");
  };

  const handleRestartGame = () => {
    // restart the game:
    storeRestartGame();
  };

  return (
    <header className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 py-1 lg:py-6">
      <div />

      <h1 className="justify-self-center text-3xl font-bold lg:text-4xl">
        Memory
      </h1>

      <div className="flex gap-3 justify-self-end lg:gap-6">
        {/* Conditionally render this button when game has already started: */}

        {shouldShowRestartButton && (
          <button
            onClick={handleRestartGame}
            className="rounded-xl bg-action-warning px-4 py-2 text-sm font-bold hover:opacity-90 lg:text-xl"
          >
            Restart Game
          </button>
        )}

        {shouldShowExitButton && (
          <button
            onClick={handleExitGame}
            className="rounded-xl bg-action-danger px-4 py-2 text-sm font-bold hover:opacity-90 lg:p-4 lg:text-xl"
          >
            Exit Game
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
