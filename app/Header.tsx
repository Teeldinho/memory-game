"use client";

import React, { useEffect } from "react";
import { useMemoryStore } from "store/store";
import { useRouter } from "next/navigation";
import shallow from "zustand/shallow";

const Header = () => {
  const {
    storeStopGame,
    storeStartGame,
    storePlayers,
    storeHasGameStarted,
    storeResetStore,
    storeFetchCards,
  } = useMemoryStore(
    (state) => ({
      storeFetchCards: state.fetchCards,
      storePlayers: state.players,
      storeStopGame: state.stopGame,
      storeStartGame: state.startGame,
      storeResetStore: state.resetStore,
      // storeShuffleCards: state.shuffleCards,
      storeHasGameStarted: state.gameStarted,
    }),
    shallow,
  );

  // useEffect(() => {}, [storeHasGameStarted]);

  // router for navigating pages:
  const router = useRouter();

  const handleExitGame = () => {
    // stop the game, reset store and redirect to home screen:
    storeStopGame();
    storeResetStore();
    router.push("/");
  };

  const handleRestartGame = () => {
    // reset the scores:
    storeResetStore(
      storePlayers.map(
        (player, index) => player.name || "Player " + index.toString(),
      ),
    );

    storeStartGame();

    // shuffle cards on restart:
    storeFetchCards();
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
