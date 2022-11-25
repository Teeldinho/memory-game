"use client";

import PlayerCard from "components/PlayerCard";
import Card, { ICard } from "components/Card";
import { ShuffleCards } from "utils/ShuffleCards";
import { StripCardDetails } from "utils/StripCardDetails";
import { useEffect, useState } from "react";
import { useMemoryStore } from "store/store";

// Fetch card data from CMS on the server side:
// const getCardsFromCMS = async () => {
//   const cards = await fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/cards?populate=*`,
//   );
//   return cards.json();
// };

const Game = () => {
  // get players from our global state:
  const players = useMemoryStore((state) => state.players);
  const [cards, setCards] = useState<any>([]);

  useEffect(() => {
    const getCardsFromCMS = async () => {
      const cardsArrayWithAllInformation = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/cards?populate=*`,
      );

      // Promise:
      const allCards = await cardsArrayWithAllInformation.json();

      // Capture data that is needed from the card:
      const orderedCards = StripCardDetails(allCards.data);

      // Shuffle the cards:
      const cards = ShuffleCards(orderedCards);

      setCards(cards);
    };

    getCardsFromCMS();
  }, []);

  console.log("Printing Cards:");
  console.log(cards);

  return (
    <div className="z-20 flex items-center w-full h-screen gap-16">
      {/* Player 1 Card showing name and score  */}
      {/* <PlayerCard {...players[0]} /> */}

      {/* Grid to render the cards: */}
      <div className="w-full p-8 rounded-lg bg-gradient-glassy">
        <div className="grid grid-cols-9 grid-rows-6 gap-8">
          {cards?.map((card: ICard, count: number) => (
            <Card key={count} {...card} />
          ))}
        </div>
      </div>

      {/* Player 2 Card showing name and score  */}
      {/* <PlayerCard {...players[1]} /> */}
    </div>
  );
};

export default Game;
