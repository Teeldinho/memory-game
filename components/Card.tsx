"use client";

import CardBack from "@/assets/Card_Back.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMemoryStore } from "store/store";
import shallow from "zustand/shallow";

export interface ICard {
  id: number;
  name: string;
  symbol: string;
  color: string;
  image: string;
  matched: boolean;
  // toggleClickable: () => void;
}

const Card = (card: ICard) => {
  const { storePlayers, storeSelectedCards, storeToggleTurn } = useMemoryStore(
    (state) => ({
      storePlayers: state.players,
      storeSelectedCards: state.selectedCards,
      storeToggleTurn: state.toggleTurn,
    }),
    shallow,
  );

  const [isFlipped, setIsFlipped] = useState(false);

  // helper function for finding matches:
  const cardsDoMatch = (): boolean => {
    // console.log(storeSelectedCards);

    // check if the selected cards have matching numbers (symbols):
    if (
      storeSelectedCards[0].name.toLowerCase() ===
      storeSelectedCards[1].name.toLowerCase()
    ) {
      console.log("The names are a match!");
      // check if the cards are jokers:
      if (storeSelectedCards[0].name.toLowerCase() === "joker") {
        console.log("Jokers found!");

        return true;
      } else {
        // else check if the colors of non-Joker cards match:
        if (
          storeSelectedCards[0].color.toLowerCase() ===
          storeSelectedCards[1].color.toLowerCase()
        ) {
          console.log("The colors are a match!");

          return true;
        }
      }
    }

    return false;
  };

  // handle the card flips:
  const handleCardFlip = () => {
    setIsFlipped(true);

    // push the card into the selected cards array:
    if (storeSelectedCards.length < 2) {
      storeSelectedCards.push(card);

      // only check if cards match if the are 2 cards flipped:
      if (storeSelectedCards.length === 2) {
        // Determine the result:
        if (cardsDoMatch()) {
          console.log("These cards are matching.");
          console.log(storeSelectedCards);

          storePlayers.map((player) => {
            // increase the player's score if they found a match:
            if (player.turnToPlay) player.score++;
          });
        } else {
          console.log("These cards are NOT matching.");
        }

        // empty the selected cards array:
        while (storeSelectedCards.length) {
          storeSelectedCards.pop();
        }

        // switch player turns:
        storeToggleTurn();
      }
    }

    // setTimeout(() => {
    //   setIsFlipped(false);
    // }, 2000);

    setIsFlipped(false);
  };

  return (
    <div
      className={`relative h-20 cursor-pointer overflow-hidden rounded-sm ease-in-out hover:scale-110 hover:opacity-80`}
      // className={`relative h-20 cursor-pointer overflow-hidden rounded-sm ease-in-out hover:scale-110 hover:opacity-80 ${
      //   isFlipped ? "pointer-events-none" : "pointer-events-auto"
      // }`}
      onClick={handleCardFlip}
    >
      {isFlipped ? (
        <Image src={card.image} fill alt="Card Front" />
      ) : (
        <Image src={card.image} fill alt="Card Front" />

        // <Image src={CardBack} fill alt="Card Back" />
      )}
    </div>
  );
};

export default Card;
