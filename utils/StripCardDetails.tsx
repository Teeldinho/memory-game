import { ICard } from "components/Card";

const StripCardDetails = (cards: any[]) => {
  return cards.map(
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
      image:
        process.env.NEXT_PUBLIC_STRAPI_URL +
        card.attributes.image.data.attributes.url,
    }),
  );
};

export { StripCardDetails };
