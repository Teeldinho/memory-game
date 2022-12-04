"use client";

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
    storeShuffleCards,
    storeResetCardsProperties,
    storeCards,
    storeFetchCards,
  } = useMemoryStore(
    (state) => ({
      storePlayers: state.players,
      storeCards: state.cards,
      storeStopGame: state.stopGame,
      storeStartGame: state.startGame,
      storeResetStore: state.resetStore,
      storeShuffleCards: state.shuffleCards,
      storeResetCardsProperties: state.resetCardsProperties,
      storeHasGameStarted: state.gameStarted,
      storeFetchCards: state.fetchCards,
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
    // reset the card properties:
    // storeResetCardsProperties(storeCards);

    // reset the scores:
    storeResetStore(
      storePlayers.map(
        (player, index) => player.name || "Player " + index.toString(),
      ),
    );

    // fetch the cards:
    storeFetchCards();

    storeStartGame();

    storeShuffleCards();
  };

  return (
    <header className="relative z-10 flex justify-end w-full p-8">
      {/* <header className="absolute top-0 right-0 w-full"> */}
      {/* <div className="relative flex justify-end w-full py-8 "> */}
      <div className="absolute right-[45%]">
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
      {/* </div> */}
    </header>
  );
};

export default Header;
