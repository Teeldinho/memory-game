"use client";
import Image from "next/image";
import { TPlayer } from "store/store";

const PlayerCardMobile = ({ id, name, score, avatar, turnToPlay }: TPlayer) => {
  return (
    <div
      className={`flex items-center justify-evenly bg-gradient-mobile-player-card ${
        id === 2 ? "flex-row-reverse bg-gradient-to-l" : ""
      }`}
    >
      {/* Player Score  */}
      <h2 className="text-base font-semibold">{score}</h2>

      {/* Player turn */}
      <div
        className={`rounded-xl bg-white p-2 text-[#489DDA] ${
          turnToPlay ? "block" : "invisible"
        }`}
      >
        <h2 className="text-base font-bold text-center capitalize">
          It's Your Turn
        </h2>
      </div>

      {/* Player Name */}
      <h2 className="text-base font-extrabold">{name}</h2>

      {/* Player Avatar: */}
      <div className="relative w-20 h-20 bg-transparent">
        <Image src={avatar} fill alt="Player Avatar" />
      </div>
    </div>
  );
};

export default PlayerCardMobile;
