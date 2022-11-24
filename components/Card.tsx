"use client";

import CardBack from "@/assets/Card_Back.png";
import Image from "next/image";
import { useState } from "react";

export interface ICard {
  id: number;
  name: string;
  symbol: string;
  color: string;
  image: string;
}

const Card = () => {
  return <></>;
};

// const Card = ({ id, name, symbol, color, imageSrc }: ICard) => {
//   const [flipped, setFlipped] = useState(false);

//   const flipCard = () => {
//     setFlipped((flip) => !flip);
//   };

//   return (
//     <div
//       className="relative h-20 ease-in-out cursor-pointer hover:opacity-60 hover:scale-105"
//       onClick={flipCard}
//     >
//       {flipped ? (
//         <Image src={imageSrc} alt="Card Back" objectFit="contain" />
//       ) : (
//         <Image src={CardBack} alt="Card Back" objectFit="contain" />
//       )}
//     </div>
//   );
// };

export default Card;
