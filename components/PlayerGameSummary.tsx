import Image from "next/image";
import Trophy from "@/assets/Trophy.png";

import { TPlayer } from "store/store";

export type TAnnouncePlayer = {
  position: number;
  player: TPlayer;
};

const PlayerGameSummary = ({ position, player }: TAnnouncePlayer) => {
  const playerPosition = position === 1 ? "1st Place" : "2nd Place";

  return (
    <div className="w-full">
      <div className="relative mx-auto flex w-[70%] items-center text-[#0D4477]">
        {/* Display the trophy alongside, only if the player won */}
        {position === 1 ? (
          <div className="absolute -left-16 lg:-left-32">
            <div className="relative grid w-12 h-12 place-items-center lg:h-36 lg:w-36">
              <Image fill src={Trophy} alt="Player Trophy" />
            </div>
          </div>
        ) : null}

        {/* Player winner card  */}
        <div
          className={`flex w-full items-center justify-around rounded-xl py-2 lg:py-5 ${
            position === 1
              ? "bg-gradient-to-r from-[#FFD975] to-yellow-100"
              : "bg-white"
          }`}
        >
          {/* player avatar: */}
          <div className="relative w-12 h-12 overflow-hidden lg:h-20 lg:w-20">
            <Image src={player.avatar} alt="Player Avatar" fill />
          </div>

          {/* player position: */}
          <h3 className="text-base font-bold lg:text-xl">{playerPosition}</h3>

          {/* player name: */}
          <h3 className="text-base lg:text-xl">{player.name}</h3>

          {/* player score: */}
          <h3 className="text-base lg:text-xl">Score: {player.score}</h3>
        </div>
      </div>
    </div>
  );
};

export default PlayerGameSummary;
