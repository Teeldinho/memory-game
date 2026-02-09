"use client";
import Image from "next/image";
import { TPlayer } from "store/store";

const PlayerCardMobile = ({ id, name, score, avatar, turnToPlay }: TPlayer) => {
  return (
    <div
      className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 lg:hidden ${
        id === 2
          ? "flex-row-reverse bg-gradient-mobile-player-card-to-l"
          : "bg-gradient-mobile-player-card-to-r"
      }`}
    >
      {/* Player Avatar: */}
      <div className="relative h-8 w-8 bg-transparent">
        <Image src={avatar} fill alt="Player Avatar" />
      </div>

      {/* Player Name */}
      <h2 className="max-w-[7rem] truncate text-sm font-extrabold sm:text-base">
        {name}
      </h2>

      {/* Player turn */}
      <div
        className={`rounded-xl bg-white p-2 px-4 text-brand-primary ${
          turnToPlay ? "block" : "invisible"
        }`}
      >
        <h2 className="text-center text-base font-bold capitalize">
          It's Your Turn
        </h2>
      </div>

      {/* Player Score  */}
      <h2 className="min-w-[2rem] text-right text-base font-semibold">
        {score}
      </h2>
    </div>
  );
};

export default PlayerCardMobile;
