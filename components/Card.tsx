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
  matched: boolean;
}

const Card = ({ id, name, symbol, color, image, matched }: ICard) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped((flip) => !flip);

    // if(){

    // }
  };

  return (
    <div
      className="relative h-20 overflow-hidden ease-in-out rounded-sm cursor-pointer hover:scale-110 hover:opacity-80"
      onClick={flipCard}
    >
      {isFlipped ? (
        <Image src={image} fill alt="Card Front" />
      ) : (
        <Image src={CardBack} fill alt="Card Back" />
      )}
    </div>
  );
};

export default Card;
