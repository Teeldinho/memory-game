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
}

const Card = (card: ICard) => {
  const {
    storePlayers,
    storeSelectedCards,
    storeToggleTurn,
    storeSetCardsMatched,
    storeIncreasePlayerScore,
  } = useMemoryStore(
    (state) => ({
      storePlayers: state.players,
      storeSelectedCards: state.selectedCards,
      storeToggleTurn: state.toggleTurn,
      storeSetCardsMatched: state.setCardsMatched,
      storeIncreasePlayerScore: state.increasePlayerScore,
    }),
    shallow,
  );

  const [isFlipped, setIsFlipped] = useState(false);

  // helper function for finding matches:
  const cardsDoMatch = (): boolean => {
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
          console.log(storeSelectedCards);

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
      // only push the card into the array if there will not be a duplicate
      if (!storeSelectedCards.some((c) => c.id === card.id)) {
        storeSelectedCards.push(card);

        // only check if cards match if the are 2 cards flipped:
        if (storeSelectedCards.length === 2) {
          // Determine the result:
          if (cardsDoMatch()) {
            console.log("These cards are matching.");
            console.log(storeSelectedCards);

            // set the cards to matching, so they can be hidden from board:
            storeSetCardsMatched(storeSelectedCards[0], storeSelectedCards[1]);

            // increase the player's score if they found a match:
            storePlayers.map((player) => {
              if (player.turnToPlay) {
                storeIncreasePlayerScore(player.id);
              }
            });
          } else {
            console.log("These cards are NOT matching.");
            // switch player turns:
            storeToggleTurn();
          }

          // empty the selected cards array:
          while (storeSelectedCards.length) {
            storeSelectedCards.pop();
          }
        }
      }

      setIsFlipped(false);
    }
  };

  return (
    <div
      className={`relative h-20 cursor-pointer overflow-hidden rounded-sm ease-in-out hover:scale-110 hover:opacity-80 ${
        card.matched ? "invisible" : ""
      } ${isFlipped ? "pointer-events-none" : "pointer-events-auto"}`}
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
