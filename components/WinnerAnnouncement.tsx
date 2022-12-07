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
    storeResetCardsProperties,
    storeCards,
    storeResetStore,
    storeStartGame,
    storeShuffleCards,
  } = useMemoryStore(
    (state) => ({
      storePlayers: state.players,
      storeCards: state.cards,
      storeGenerateWinners: state.generateWinnersList,
      storeWinnersList: state.winnersList,
      storeWinnerFound: state.winnerFound,
      storeAnnounceWinner: state.announceWinner,
      storeResetCardsProperties: state.resetCardsProperties,
      storeResetStore: state.resetStore,
      storeStartGame: state.startGame,
      storeShuffleCards: state.shuffleCards,
    }),
    shallow,
  );

  // generate winners by sorting the array in accordance to the scores:
  useEffect(() => {
    storeGenerateWinners(storePlayers);
  }, []);

  const router = useRouter();

  const handlePlayAgain = () => {
    // reset the card properties:
    storeResetCardsProperties(storeCards);

    // reset the scores:
    storeResetStore(
      storePlayers.map(
        (player, index) => player.name || "Player " + index.toString(),
      ),
    );

    // shuffle the card deck twice:
    storeShuffleCards();
    storeShuffleCards();

    storeAnnounceWinner(false);

    // start the game:
    storeStartGame();

    router.push("/game");
    router.refresh();
  };

  return (
    <>
      {/* {storeWinnerFound ? ( */}
      <div className="absolute top-0 left-0 z-50 grid w-full h-full place-items-center">
        {/* Inner div */}
        <div className="flex w-full max-w-[80vw] flex-col items-center justify-center gap-4 rounded-xl bg-gradient-mobile p-4 lg:max-w-4xl lg:gap-16 lg:bg-none">
          {/* Winning player name and message: */}
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-bold lg:text-5xl">Well Done!</h2>
            <h1 className="text-4xl font-bold lg:text-7xl">
              {storeWinnersList[0]?.name}
            </h1>
          </div>

          {/* Winning Player Image */}
          <div>
            <div className={`relative z-10 mx-auto h-24 w-24 lg:h-52 lg:w-52`}>
              <Image
                src={storeWinnersList[0]?.avatar}
                fill
                alt="Player Avatar"
              />

              {/* Celebration decoration: */}
              <div className="absolute top-0 left-0 w-full h-full -z-10">
                <Image src={WinnerDeco} alt="Player Avatar" />
              </div>
            </div>
          </div>

          {/* Player summary of game: */}
          <div className="flex flex-col w-full gap-2 lg:gap-4">
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
              className="rounded-xl bg-[#A7DAFF] px-4 py-3 font-bold uppercase text-[#164464] hover:opacity-80 lg:py-5"
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
