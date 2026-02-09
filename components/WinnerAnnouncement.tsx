import Image from "next/image";

// import celebration decoration:
import WinnerDeco from "@/assets/WinnerDeco.png";

import PlayerGameSummary, {
  TAnnouncePlayer,
} from "components/PlayerGameSummary";
import { useMemoryStore } from "store/store";
import shallow from "zustand/shallow";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const WinnerAnnouncement = () => {
  const {
    storePlayers,
    storeGenerateWinners,
    storeAnnounceWinner,
    storeRestartGame,
    storeWinnersList,
    storeResetStore,
    storeStopGame,
  } = useMemoryStore(
    (state) => ({
      storePlayers: state.players,
      storeGenerateWinners: state.generateWinnersList,
      storeAnnounceWinner: state.announceWinner,
      storeRestartGame: state.restartGame,
      storeWinnersList: state.winnersList,
      storeResetStore: state.resetStore,
      storeStopGame: state.stopGame,
    }),
    shallow
  );

  // generate winners by sorting the array in accordance to the scores:
  useEffect(() => {
    storeGenerateWinners(storePlayers);
  }, []);

  const router = useRouter();

  const handlePlayAgain = () => {
    // restart the game:
    storeRestartGame();

    // redirect to game:
    router.push("/game");
    // router.refresh();
  };

  const handleExitGame = () => {
    // stop the game, reset store and redirect to home screen:
    storeAnnounceWinner(false);
    storeStopGame();
    storeResetStore();
    router.push("/");
  };

  return (
    <>
      <div className="absolute top-0 left-0 z-50 grid h-full w-full place-items-center p-2">
        {/* Exit button on mobile screens: */}
        <div className="absolute right-4 top-4">
          <button
            onClick={handleExitGame}
            className="rounded-xl bg-action-danger px-4 py-2 text-sm font-bold hover:opacity-90 lg:p-4 lg:text-xl"
          >
            Exit Game
          </button>
        </div>

        {/* Inner div */}
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-4 rounded-xl bg-gradient-mobile px-4 py-6 sm:px-6 lg:gap-12 lg:bg-none">
          {/* Winning player name and message: */}
          <div className="flex flex-col text-center lg:gap-4">
            <h2 className="text-2xl font-bold lg:text-5xl">Well Done!</h2>
            <h1 className="text-4xl font-bold lg:text-7xl">
              {storeWinnersList[0]?.name}
            </h1>
          </div>

          {/* Winning Player Image */}
          <div>
            <div className={`relative mx-auto h-16 w-16 lg:h-36 lg:w-36`}>
              <Image
                src={storeWinnersList[0]?.avatar}
                fill
                alt="Player Avatar"
              />

              {/* Celebration decoration: */}
              <div className="absolute top-0 left-0 -z-10 h-full w-full">
                <Image src={WinnerDeco} alt="Player Avatar" />
              </div>
            </div>
          </div>

          {/* Player summary of game: */}
          <div className="flex w-full flex-col gap-2 lg:gap-4">
            {storeWinnersList.map((player, position) => {
              const playerSummary: TAnnouncePlayer = {
                player,
                position: position + 1,
              };
              return (
                <PlayerGameSummary
                  key={`${player.id}-${position}`}
                  {...playerSummary}
                />
              );
            })}
          </div>

          {/* Play Again call to action:             */}
          <div>
            <button
              className="rounded-xl bg-action-info px-8 py-2 text-base font-bold uppercase text-brand-heading hover:opacity-80 lg:py-5"
              onClick={handlePlayAgain}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WinnerAnnouncement;
