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

const Card = ({ id, name, symbol, color, image }: ICard) => {
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped((flip) => !flip);
  };

  return (
    <div
      className="relative h-20 ease-in-out cursor-pointer hover:scale-110 hover:opacity-80"
      onClick={flipCard}
    >
      {flipped ? (
        <Image src={image} fill alt="Card Front" />
      ) : (
        <Image src={CardBack} fill alt="Card Back" />
      )}
    </div>
  );
};

export default Card;
