import CardBack from "@/assets/cards/Card_Back.png";
import Image from "next/image";

const Card = () => {
  return (
    <div className="relative h-20 cursor-pointer hover:opacity-50">
      <Image src={CardBack} alt="Card Back" objectFit="contain" />
    </div>
  );
};

export default Card;
