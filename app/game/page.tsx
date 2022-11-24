import PlayerCard from "components/PlayerCard";
import AvatarPlayer1 from "@/assets/Player1.png";
import AvatarPlayer2 from "@/assets/Player2.png";
import Card from "components/Card";

const player1 = {
  id: 1,
  name: "Player 1",
  score: 10,
  avatar: AvatarPlayer1,
};

const player2 = {
  id: 2,
  name: "Player 2",
  score: 12,
  avatar: AvatarPlayer2,
};

// Fetch card data from CMS on the server side:
const getCardsFromCMS = async () => {
  const cards = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/cards?populate=*`,
  );

  console.log(cards);

  return cards.json();
};

// id: number;
// name: string;
// symbol: string;
// color: string;
// image: string;

const Game = async () => {
  // destructure response data object as cards array:
  const { data: cardsArrayWithAllInformation } = await getCardsFromCMS();

  // capture data that is needed from the card:
  const cards = cardsArrayWithAllInformation.map(
    (card: {
      id: number;
      attributes: {
        name: string;
        symbol: string;
        color: string;
        image: {
          data: {
            attributes: {
              url: string;
            };
          };
        };
      };
    }) => ({
      id: card.id,
      name: card.attributes.name,
      symbol: card.attributes.symbol,
      color: card.attributes.color,
      image: card.attributes.image.data.attributes.url,
    }),
  );

  return (
    <div className="z-20 flex items-center w-full h-screen gap-16">
      {/* Player 1 Card showing name and score  */}
      <PlayerCard {...player1} myTurn={false} />

      {/* Grid to render the cards: */}
      <div className="w-full p-8 rounded-lg bg-gradient-glassy">
        <div className="grid grid-cols-9 grid-rows-6 gap-8">
          {/* {cards?.map((card) => (
            <Card {...card} />
          ))} */}
        </div>
      </div>

      {/* Player 2 Card showing name and score  */}
      <PlayerCard {...player2} myTurn={false} />
    </div>
  );
};

export default Game;
