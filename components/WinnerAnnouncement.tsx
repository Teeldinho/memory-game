import Image from "next/image";

// import celebration decoration:
import WinnerDeco from "@/assets/WinnerDeco.png";

import AvatarPlayer1 from "@/assets/Player1.png";
import PlayerGameSummary from "components/PlayerGameSummary";
import { useMemoryStore } from "store/store";
import shallow from "zustand/shallow";
import { useEffect } from "react";

const WinnerAnnouncement = () => {
  const { storePlayers, storeGenerateWinners, storeWinnersList } =
    useMemoryStore(
      (state) => ({
        storePlayers: state.players,
        storeGenerateWinners: state.generateWinnersList,
        storeWinnersList: state.winnersList,
      }),
      shallow,
    );

  // Generate winners list upon render:
  useEffect(() => {
    // generate winners:
    // sort the array in accordance to the scores:
    storeGenerateWinners(storePlayers);
  }, []);

  return (
    <>
      {storeWinnersList.length > 0 ? (
        <div className="absolute top-0 left-0 z-50 flex w-full h-full max-w-4xl mx-auto">
          <div className="flex flex-col w-full gap-16 mx-auto">
            {/* Winning player name and message: */}
            <div className="text-center">
              <h2 className="text-5xl font-bold">Well Done!</h2>
              <h1 className="mt-4 font-bold text-7xl">
                {storeWinnersList[0].name}
              </h1>
            </div>

            {/* Winning Player Image */}
            <div>
              <div
                className={`relative z-10 mx-auto grid h-52 w-full max-w-xs place-items-center`}
              >
                <Image src={AvatarPlayer1} alt="Player Avatar" />

                {/* Celebration decoration: */}
                <div className="absolute top-0 left-0 w-full h-full -z-10">
                  <Image src={WinnerDeco} fill alt="Player Avatar" />
                </div>
              </div>
            </div>

            {/* Player summary of game: */}
            {/* // <PlayerGameSummary /> */}

            {/* Play Again call to action:             */}
            <div>
              <button className="rounded-lg bg-[#A7DAFF] px-4 py-5 font-bold uppercase text-[#164464]">
                Play Again
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-7xl">No winners found.</h1>
        </div>
      )}
    </>
  );
};

export default WinnerAnnouncement;
