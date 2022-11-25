import Image from "next/image";
import { TPlayer } from "store/store";

const PlayerCard = (player: TPlayer) => {
  const { id, name, score, avatar, turnToPlay } = player;

  return (
    <div className="flex flex-col gap-4">
      {/* Player Card */}
      <div className="flex h-[350px] flex-col gap-8 rounded-lg bg-gradient-player-card p-7 lg:w-48">
        <div className="relative grid w-full bg-transparent h-52 place-items-center">
          <Image src={avatar} alt="Player Avatar" />
        </div>

        <div className="flex flex-col items-center w-full gap-4">
          <h2 className="text-xl font-extrabold">{name}</h2>
          <h2 className="text-xl font-semibold">Score: {score}</h2>
        </div>
      </div>

      {/* Player Turn Indicator: */}
      {/* Conditionally render the output based on whose turn it is: */}

      {turnToPlay &&
        (id === 1 ? (
          <div className="rounded-lg bg-[#0AB169] py-4 text-white">
            <h2 className="text-2xl font-bold text-center">It's Your Turn</h2>
          </div>
        ) : (
          <div className="rounded-lg bg-white py-4 text-[#489DDA]">
            <h2 className="text-2xl font-bold text-center">It's Your Turn</h2>
          </div>
        ))}
    </div>
  );
};

export default PlayerCard;
