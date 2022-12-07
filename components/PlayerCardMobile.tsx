"use client";
import Image from "next/image";
import { TPlayer } from "store/store";

const PlayerCardMobile = ({ id, name, score, avatar, turnToPlay }: TPlayer) => {
  return (
    <div
      className={`flex w-full items-center justify-between rounded-xl px-4 py-2 lg:hidden ${
        id === 2
          ? "flex-row-reverse bg-gradient-mobile-player-card-to-l"
          : "bg-gradient-mobile-player-card-to-r"
      }`}
    >
      {/* Player Avatar: */}
      <div className="relative w-12 h-12 bg-transparent">
        <Image src={avatar} fill alt="Player Avatar" />
      </div>

      {/* Player Name */}
      <h2 className="text-base font-extrabold">{name}</h2>

      {/* Player turn */}
      <div
        className={`rounded-xl bg-white p-2 px-4 text-[#489DDA] ${
          turnToPlay ? "block" : "invisible"
        }`}
      >
        <h2 className="text-base font-bold text-center capitalize">
          It's Your Turn
        </h2>
      </div>

      {/* Player Score  */}
      <h2 className="text-base font-semibold">{score}</h2>
    </div>
  );
};

export default PlayerCardMobile;
