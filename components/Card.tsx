"use client";

import CardBack from "@/assets/Card_Back.png";
import Image from "next/image";
import { useMemoryStore } from "store/store";
import shallow from "zustand/shallow";

export interface ICard {
  id: number;
  name: string;
  symbol: string;
  color: string;
  image: string;
  flipped: boolean;
  matched: boolean;
}

const Card = (card: ICard) => {
  const {
    storePlayers,
    storeCards,
    storeSelectedCards,
    storeAnnounceWinner,
    storeToggleTurn,
    storeSetCardsMatched,
    storeIncreasePlayerScore,
    storeClearSelectedCards,
    storeFlipSelectedCard,
    storeCardIsFlipped,
  } = useMemoryStore(
    (state) => ({
      storePlayers: state.players,
      storeCards: state.cards,
      storeSelectedCards: state.selectedCards,
      storeAnnounceWinner: state.announceWinner,
      storeToggleTurn: state.toggleTurn,
      storeSetCardsMatched: state.setCardsMatched,
      storeIncreasePlayerScore: state.increasePlayerScore,
      storeClearSelectedCards: state.clearSelectedCards,
      storeCardIsFlipped: state.cardIsFlipped,
      storeFlipSelectedCard: state.flipSelectedCard,
    }),
    shallow,
  );

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

          return true;
        }
      }
    }

    return false;
  };

  // handle the card flips:
  const handleCardFlip = () => {
    // flip the selected card:
    storeFlipSelectedCard(card);

    // push the card into the selected cards array:
    if (storeSelectedCards.length < 2) {
      // only push the card into the array if there will not be a duplicate (i.e. double clicking on a card will not match):
      if (!storeSelectedCards.some((c) => c.id === card.id)) {
        storeSelectedCards.push(card);
        // only check if cards match if the are 2 cards flipped:
        if (storeSelectedCards.length === 2) {
          // Determine the result:
          if (cardsDoMatch()) {
            console.log("These cards are matching.");
            // set the cards to matching, so they can be hidden from board:
            storeSetCardsMatched(storeSelectedCards[0], storeSelectedCards[1]);
            // increase the player's score if they found a match:
            storePlayers.map((player) => {
              if (player.turnToPlay) {
                storeIncreasePlayerScore(player.id);
              }
            });

            // check if it's the last 2 cards that are not matched:
            const checkLastCards = storeCards.filter(
              (c) => c.matched === false,
            );
            // trigger a results overlay when EVERY card has been matched:
            if (checkLastCards.length === 2) {
              // trigger annoucement if both cards are selected:
              if (storeSelectedCards.length === 2) {
                storeClearSelectedCards();
                storeAnnounceWinner(true);
              }
            }
            // if (storeCards.every((card) => card.matched === true)) {
            //   storeAnnounceWinner(true);
            // }
          } else {
            console.log("These cards are NOT matching.");

            // switch player turns:
            storeToggleTurn();
          }

          setTimeout(() => {
            // clear the selected cards:
            storeClearSelectedCards();
          }, 800);
        }
      }
    }
  };

  return (
    <div
      className={`relative h-full max-h-20 min-h-[45px] w-full cursor-pointer overflow-hidden rounded-sm ease-in-out hover:scale-110 hover:opacity-80 lg:h-20 ${
        card.matched ? "invisible" : ""
      }`}
      onClick={handleCardFlip}
    >
      {storeCardIsFlipped(card) ? (
        <Image src={card.image} fill alt="Card Front" />
      ) : (
        <Image src={CardBack} fill alt="Card Back" />
      )}
    </div>
  );
};

export default Card;
