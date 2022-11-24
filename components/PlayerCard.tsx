import Image from "next/image";

interface IPlayer {
  name: string;
  score: number;
  avatar: any;
}

const PlayerCard = (player: IPlayer) => {
  const { name, score, avatar } = player;

  return (
    <div className="flex h-[350px] w-80 flex-col gap-8 rounded-lg bg-gradient-player-card p-7">
      <div className="relative grid w-full bg-transparent h-52 place-items-center">
        <Image src={avatar} alt="Player Avatar" objectFit="contain" />
      </div>

      <div className="flex flex-col items-center w-full gap-4">
        <h2 className="text-xl font-extrabold">{name}</h2>
        <h2 className="text-xl font-semibold">Score: {score}</h2>
      </div>
    </div>
  );
};

export default PlayerCard;
