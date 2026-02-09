"use client";
import Image from "next/image";
import { TPlayer } from "store/store";

const PlayerCard = (player: TPlayer) => {
  const { id, name, score, avatar, turnToPlay } = player;
  return (
    <div className="hidden flex-col gap-4 lg:flex">
      {/* Player Card */}
      <div className="flex h-[350px] w-48 flex-col gap-8 rounded-xl bg-gradient-player-card p-7">
        <div className="relative grid h-52 w-full place-items-center bg-transparent">
          <Image src={avatar} alt="Player Avatar" />
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          <h2 className="text-xl font-extrabold">{name}</h2>
          <h2 className="text-xl font-semibold">Score: {score}</h2>
        </div>
      </div>

      {/* Player Turn Indicator: */}
      {/* Conditionally render the output based on whose turn it is: */}

      {id === 1 ? (
        <div
          className={`rounded-xl bg-action-success py-4 text-white ${
            turnToPlay ? "block" : "invisible"
          }`}
        >
          <h2 className="text-center text-2xl font-bold">It's Your Turn</h2>
        </div>
      ) : (
        <div
          className={`rounded-xl bg-white py-4 text-brand-primary ${
            turnToPlay ? "block" : "invisible"
          }`}
        >
          <h2 className="text-center text-2xl font-bold">It's Your Turn</h2>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
