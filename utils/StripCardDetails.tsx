const StripCardDetails = (cards: any[]) => {
  const strippedCards = cards?.map(
    (
      card: {
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
        flipped: boolean;
        matched: boolean;
      },
      id,
    ) => ({
      id: id,
      name: card.attributes.name,
      symbol: card.attributes.symbol,
      color: card.attributes.color,
      image:
        process.env.NEXT_PUBLIC_STRAPI_URL +
        card.attributes.image.data.attributes.url,
      matched: false,
      flipped: false,
    }),
  );

  return strippedCards;
};

export { StripCardDetails };

// const strippedCards = cards?.map(
//   (card: {
//     id: number;
//     attributes: {
//       name: string;
//       symbol: string;
//       color: string;
//       image: {
//         data: {
//           attributes: {
//             url: string;
//           };
//         };
//       };
//     };
//     flipped: boolean;
//     matched: boolean;
//   }, id) => ({
//     id: id,
//     name: card.attributes.name,
//     symbol: card.attributes.symbol,
//     color: card.attributes.color,
//     image:
//       process.env.NEXT_PUBLIC_STRAPI_URL +
//       card.attributes.image.data.attributes.url,
//     matched: false,
//     flipped: false,
//   }),
// );
