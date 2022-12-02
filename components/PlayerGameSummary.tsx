import Image from "next/image";
import Trophy from "@/assets/Trophy.png";

import { TPlayer } from "store/store";

export type TAnnouncePlayer = {
  position: number;
  player: TPlayer;
};

const PlayerGameSummary = ({ position, player }: TAnnouncePlayer) => {
  return (
    <>
      <div className="relative flex w-full text-[#0D4477]">
        {/* Display the trophy alongside, only if the player won */}
        {position === 1 ? (
          <div className="absolute top-4 -left-32">
            <div className="relative grid w-20 h-20 bg-green-200 place-items-center">
              <Image src={Trophy} alt="Player Trophy" />
            </div>
          </div>
        ) : null}

        {/* Player winner card  */}
        <div
          className={`flex w-full items-center justify-evenly rounded-lg px-8 py-4 ${
            position + 1 === 1
              ? "bg-gradient-to-r from-[#FFD975] to-yellow-50"
              : "bg-white"
          }`}
        >
          {/* player avatar: */}
          <div className="relative grid h-20 w-full max-w-[5rem] place-items-center overflow-hidden">
            <Image src={player.avatar} alt="Player Avatar" fill />
          </div>

          {/* player position: */}
          <h3 className="text-xl font-bold">{position + 1}</h3>

          {/* player name: */}
          <h3 className="text-xl">{player.name}</h3>

          {/* player score: */}
          <h3 className="text-xl">Score: {player.score}</h3>
        </div>
      </div>
      ))
    </>
  );
};

export default PlayerGameSummary;
