"use client";

import { useMemoryStore } from "store/store";
import { useRouter } from "next/navigation";
import shallow from "zustand/shallow";

const Header = () => {
  const {
    storeStopGame,
    storeStartGame,
    storeHasGameStarted,
    storeResetStore,
    storeShuffleCards,
    storeFlashDisplayCards,
    storeRemoveFlashDisplayCards,
  } = useMemoryStore(
    (state) => ({
      storeStopGame: state.stopGame,
      storeStartGame: state.startGame,
      storeResetStore: state.resetStore,
      storeShuffleCards: state.shuffleCards,
      storeHasGameStarted: state.gameStarted,
      storeFlashDisplayCards: state.flashDisplayCards,
      storeRemoveFlashDisplayCards: state.removeFlashDisplayCards,
    }),
    shallow,
  );

  // router for navigating pages:
  const router = useRouter();

  const handleExitGame = () => {
    // stop the game, reset store and redirect to home screen:
    storeStopGame();
    storeResetStore();
    router.push("/");
  };

  const handleRestartGame = () => {
    // reset the scores and start game:
    storeResetStore();
    storeStartGame();
    storeShuffleCards();

    // flash the cards for players to memorise upon starting:
    storeFlashDisplayCards();
    setTimeout(() => {
      storeRemoveFlashDisplayCards();
    }, 5000);
  };

  return (
    <header className="flex items-center justify-between w-full md:justify-end lg:py-6">
      {/* Shown on desktop */}
      <div className="absolute left-[44%] hidden md:block">
        <h1 className="text-3xl font-bold lg:text-4xl">Memory</h1>
      </div>

      {/* Hidden on desktop */}
      <div className="md:hidden">
        <h1 className="text-3xl font-bold lg:text-4xl">Memory</h1>
      </div>

      <div className="flex gap-4 lg:gap-8">
        {/* Conditionally render this button when game has already started: */}

        {storeHasGameStarted && (
          <button
            onClick={handleRestartGame}
            className="rounded-xl bg-[#F4A236] px-4 py-2 text-sm font-bold hover:opacity-90 lg:text-xl"
          >
            Restart Game
          </button>
        )}

        <button
          onClick={handleExitGame}
          className="rounded-xl bg-[#D4190C] px-4 py-2 text-sm font-bold hover:opacity-90 lg:p-4 lg:text-xl"
        >
          Exit Game
        </button>
      </div>
    </header>
  );
};

export default Header;
