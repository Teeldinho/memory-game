const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchEntries() {
  const cards = await client.getEntries().then((c) => console.log(c.items));

  console.log("CARDS");
  console.log(cards);
  return cards;
}

export default { fetchEntries };
