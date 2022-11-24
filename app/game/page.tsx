import PlayerCard from "components/PlayerCard";
import Card, { ICard } from "components/Card";
import { ShuffleCards } from "utils/ShuffleCards";
import { StripCardDetails } from "utils/StripCardDetails";
import { player1, player2 } from "data/PlayerData";

// Fetch card data from CMS on the server side:
const getCardsFromCMS = async () => {
  const cards = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/cards?populate=*`,
  );
  return cards.json();
};

const Game = async () => {
  // destructure response data object as cards array:
  const { data: cardsArrayWithAllInformation } = await getCardsFromCMS();

  // capture data that is needed from the card:
  const orderedCards = StripCardDetails(cardsArrayWithAllInformation);

  // Shuffle the cards:
  const cards = ShuffleCards(orderedCards);

  return (
    <div className="z-20 flex items-center w-full h-screen gap-16">
      {/* Player 1 Card showing name and score  */}
      <PlayerCard {...player1} myTurn={false} />

      {/* Grid to render the cards: */}
      <div className="w-full p-8 rounded-lg bg-gradient-glassy">
        <div className="grid grid-cols-9 grid-rows-6 gap-8">
          {cards?.map((card: ICard, count: number) => (
            <Card key={count} {...card} />
          ))}
        </div>
      </div>

      {/* Player 2 Card showing name and score  */}
      <PlayerCard {...player2} myTurn={false} />
    </div>
  );
};

export default Game;
