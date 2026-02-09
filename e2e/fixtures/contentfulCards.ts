export const MOCK_CONTENTFUL_RESPONSE = {
  data: {
    memoryCardCmsCollection: {
      items: [
        {
          sys: { id: "card-1" },
          name: "Ace",
          symbol: "A",
          color: "red",
          image: {
            url: "/favicon.ico",
          },
        },
        {
          sys: { id: "card-2" },
          name: "Ace",
          symbol: "A",
          color: "red",
          image: {
            url: "/favicon.ico",
          },
        },
      ],
    },
  },
};

export const HOME_VIEWPORTS = [
  { label: "mobile-portrait", width: 390, height: 844 },
  { label: "mobile-landscape", width: 844, height: 390 },
  { label: "tablet-portrait", width: 768, height: 1024 },
  { label: "tablet-landscape", width: 1080, height: 810 },
  { label: "desktop", width: 1440, height: 900 },
] as const;
