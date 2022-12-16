import { ICard } from "components/Card";

const StripCardDetails = (cards: any[]) => {
  const strippedCards = cards?.map(
    (card) =>
      ({
        id: card.sys.id,
        name: card.name,
        symbol: card.symbol,
        color: card.color,
        image: "https:" + card.image.url,
        matched: false,
        flipped: false,
      } as ICard),
  );

  return strippedCards;
};

export { StripCardDetails };
