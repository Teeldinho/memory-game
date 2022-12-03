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
    storeWinnersList,
    storeWinnerFound,
    storeAnnounceWinner,
  } = useMemoryStore(
    (state) => ({
      storePlayers: state.players,
      storeGenerateWinners: state.generateWinnersList,
      storeWinnersList: state.winnersList,
      storeWinnerFound: state.winnerFound,
      storeAnnounceWinner: state.announceWinner,
    }),
    shallow,
  );

  // generate winners by sorting the array in accordance to the scores:
  useEffect(() => {
    storeGenerateWinners(storePlayers);
  }, []);

  const router = useRouter();

  const handlePlayAgain = () => {
    storeAnnounceWinner(false);
    router.push("/game");
  };

  return (
    <>
      {/* {storeWinnerFound ? ( */}
      <div className="absolute top-0 z-50 flex w-full h-full bg-red-200">
        <div className="flex flex-col items-center justify-center w-full max-w-4xl gap-16 mx-auto">
          {/* Winning player name and message: */}
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-5xl font-bold">Well Done!</h2>
            <h1 className="font-bold text-7xl">{storeWinnersList[0]?.name}</h1>
          </div>

          {/* Winning Player Image */}
          <div>
            <div
              className={`relative z-10 mx-auto grid h-52 w-full max-w-sm place-items-center`}
            >
              <Image src={storeWinnersList[0]?.avatar} alt="Player Avatar" />

              {/* Celebration decoration: */}
              <div className="absolute top-0 left-0 w-full h-full -z-10">
                <Image src={WinnerDeco} alt="Player Avatar" />
              </div>
            </div>
          </div>

          {/* Player summary of game: */}
          <div className="flex flex-col w-full gap-4">
            {storeWinnersList.map((player, position) => {
              const playerSummary: TAnnouncePlayer = {
                player,
                position: position + 1,
              };
              return <PlayerGameSummary {...playerSummary} />;
            })}
          </div>

          {/* Play Again call to action:             */}
          <div>
            <button
              className="rounded-lg bg-[#A7DAFF] px-4 py-5 font-bold uppercase text-[#164464] hover:opacity-80"
              onClick={handlePlayAgain}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
      {/* ) : (
        <div className="grid w-full h-full place-items-center">
          <h1 className="font-bold text-7xl">No winners found.</h1>
        </div>
      )} */}
    </>
  );
};

export default WinnerAnnouncement;
