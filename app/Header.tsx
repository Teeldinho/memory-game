"use client";

import React from "react";
import { useMemoryStore } from "store/store";
import { useRouter } from "next/navigation";
import shallow from "zustand/shallow";

const Header = () => {
  const {
    storeStopGame,
    storeHasGameStarted,
    storeShuffleCards,
    storeResetScores,
  } = useMemoryStore(
    (state) => ({
      storeStopGame: state.stopGame,
      storeResetScores: state.resetScores,
      storeShuffleCards: state.shuffleCards,
      storeHasGameStarted: state.gameStarted,
    }),
    shallow,
  );

  // router for navigating pages:
  const router = useRouter();

  const handleExitGame = () => {
    // stop the game and redirect to home screen:
    storeStopGame();
    router.push("/");
  };

  const handleRestartGame = () => {
    // reset the scores and shuffle the cards for restarting game:
    storeResetScores();
    storeShuffleCards();
  };

  return (
    <header className="absolute top-0 right-0 w-full">
      <div className="relative flex justify-end w-full py-8 ">
        <div className="absolute right-[46%]">
          <h1 className="text-4xl font-bold">Memory</h1>
        </div>

        <div className="flex gap-8">
          {/* Conditionally render this button when game has already started: */}

          {storeHasGameStarted && (
            <button
              onClick={handleRestartGame}
              className="rounded-lg bg-[#F4A236] p-4 text-xl font-bold hover:opacity-90"
            >
              Restart Game
            </button>
          )}

          <button
            onClick={handleExitGame}
            className="rounded-lg bg-[#D4190C] p-4 text-xl font-bold hover:opacity-90"
          >
            Exit Game
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
