// import celebration decoration:
import CardMatchDeco from "@/assets/CardMatchDeco.png";
import Image from "next/image";

const CardMatchFoundOverlay = () => {
  return (
    <div
      className={`relative z-50 grid h-full w-full place-items-center bg-gradient-card-match`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center text-[#489DDA]">
        <h1 className="text-3xl font-semibold lg:text-5xl">It's A</h1>
        <h1 className="text-5xl font-bold lg:text-7xl">Match!</h1>
      </div>

      {/* Celebration decoration: */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative w-full h-full">
          <Image src={CardMatchDeco} fill alt="Card Deco" />
        </div>
      </div>
    </div>
  );
};

export default CardMatchFoundOverlay;
