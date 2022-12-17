import gql from "graphql-tag";
import apolloClient from "./apollo-client";
import { ShuffleCards } from "./ShuffleCards";
import { StripCardDetails } from "./StripCardDetails";

export async function fetchCardsFromCMS() {
  const { data } = await apolloClient.query({
    query: gql`
      query memoryCardCmsCollectionQuery {
        memoryCardCmsCollection {
          items {
            sys {
              id
            }
            name
            symbol
            color
            image {
              url
            }
          }
        }
      }
    `,
  });

  // strip card details to match card interface:
  const processedCards = StripCardDetails(data.memoryCardCmsCollection.items);

  // shuffle the cards:
  ShuffleCards(processedCards);
  ShuffleCards(processedCards);
  ShuffleCards(processedCards);

  return processedCards;
}

export default { fetchCardsFromCMS };
