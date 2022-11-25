"use client";

import React from "react";
import { useMemoryStore } from "store/store";
import { useRouter } from "next/navigation";

const Header = () => {
  const players = useMemoryStore((state) => state.players);

  const restartGame = useMemoryStore((state) => state.resetScores);
  // const resetCards = useMemoryStore((state) => state.shuffleCards);

  // router for navigating pages:
  const router = useRouter();

  const handleExitGame = () => {
    sessionStorage.clear();
    router.push("/");
    // router.replace("/");
    // router.refresh();
  };

  const handleRestartGame = () => {
    restartGame();

    // router.replace("/game");
    router.push("/");
    router.push("/game");
    router.refresh();
  };

  return (
    <header className="absolute top-0 right-0 w-full">
      <div className="relative flex w-full justify-end py-8 ">
        <div className="absolute right-[46%]">
          <h1 className="text-4xl font-bold">Memory</h1>
        </div>

        <div className="flex gap-8">
          {/* Conditionally render this button when game has already started: */}

          {players[0].name && players[1].name && (
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
