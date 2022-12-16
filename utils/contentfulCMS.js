import gql from "graphql-tag";
import apolloClient from "./apollo-client";
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

  const processedCards = StripCardDetails(data.memoryCardCmsCollection.items);

  return processedCards;
}

export default { fetchCardsFromCMS };
