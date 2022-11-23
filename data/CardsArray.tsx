import { StaticImageData } from "next/image";

import * as Images from "@/assets/index";

type Color = "RED" | "BLACK";
type Symbol = "CLUB" | "DIAMOND" | "HEART" | "SPADE" | "JOKER";

interface ICard {
  id: number;
  name: string;
  symbol: Symbol;
  color: Color;
  imageSrc: StaticImageData;
}

// Card_A_Club,
// Card_A_Diamond,
// Card_A_Heart,
// Card_A_Spade,

const CardsArray: ICard[] = [
  {
    id: 1,
    name: "A",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_A_Club,
  },
  {
    id: 2,
    name: "A",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_A_Diamond,
  },
  {
    id: 3,
    name: "A",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_A_Spade,
  },
  {
    id: 4,
    name: "A",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_A_Heart,
  },

  {
    id: 5,
    name: "2",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_2_Club,
  },
  {
    id: 6,
    name: "2",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_2_Diamond,
  },
  {
    id: 7,
    name: "2",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_2_Spade,
  },
  {
    id: 8,
    name: "2",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_2_Heart,
  },

  {
    id: 9,
    name: "3",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_3_Club,
  },
  {
    id: 10,
    name: "3",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_3_Diamond,
  },
  {
    id: 11,
    name: "3",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_3_Spade,
  },
  {
    id: 12,
    name: "3",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_3_Heart,
  },

  {
    id: 13,
    name: "4",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_4_Club,
  },
  {
    id: 14,
    name: "4",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_4_Diamond,
  },
  {
    id: 15,
    name: "4",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_4_Spade,
  },
  {
    id: 16,
    name: "4",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_4_Heart,
  },

  {
    id: 17,
    name: "5",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_5_Club,
  },
  {
    id: 18,
    name: "5",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_5_Diamond,
  },
  {
    id: 19,
    name: "5",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_5_Spade,
  },
  {
    id: 20,
    name: "5",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_5_Heart,
  },

  {
    id: 21,
    name: "6",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_6_Club,
  },
  {
    id: 22,
    name: "6",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_6_Diamond,
  },
  {
    id: 23,
    name: "6",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_6_Spade,
  },
  {
    id: 24,
    name: "6",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_6_Heart,
  },

  {
    id: 25,
    name: "7",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_7_Club,
  },
  {
    id: 26,
    name: "7",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_7_Diamond,
  },
  {
    id: 27,
    name: "7",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_7_Spade,
  },
  {
    id: 28,
    name: "7",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_7_Heart,
  },

  {
    id: 29,
    name: "8",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_8_Club,
  },
  {
    id: 30,
    name: "8",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_8_Diamond,
  },
  {
    id: 31,
    name: "8",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_8_Spade,
  },
  {
    id: 32,
    name: "8",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_8_Heart,
  },

  {
    id: 33,
    name: "9",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_9_Club,
  },
  {
    id: 34,
    name: "9",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_9_Diamond,
  },
  {
    id: 35,
    name: "9",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_9_Spade,
  },
  {
    id: 36,
    name: "9",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_9_Heart,
  },

  {
    id: 37,
    name: "10",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_10_Club,
  },
  {
    id: 38,
    name: "10",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_10_Diamond,
  },
  {
    id: 39,
    name: "10",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_10_Spade,
  },
  {
    id: 40,
    name: "10",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_10_Heart,
  },

  {
    id: 41,
    name: "J",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_J_Club,
  },
  {
    id: 42,
    name: "J",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_J_Diamond,
  },
  {
    id: 43,
    name: "J",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_J_Spade,
  },
  {
    id: 44,
    name: "J",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_J_Heart,
  },

  {
    id: 45,
    name: "Q",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_Q_Club,
  },
  {
    id: 46,
    name: "Q",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_Q_Diamond,
  },
  {
    id: 47,
    name: "Q",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_Q_Spade,
  },
  {
    id: 48,
    name: "Q",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_Q_Heart,
  },

  {
    id: 49,
    name: "K",
    symbol: "CLUB",
    color: "BLACK",
    imageSrc: Images.default.Card_K_Club,
  },
  {
    id: 50,
    name: "K",
    symbol: "DIAMOND",
    color: "RED",
    imageSrc: Images.default.Card_K_Diamond,
  },
  {
    id: 51,
    name: "K",
    symbol: "SPADE",
    color: "BLACK",
    imageSrc: Images.default.Card_K_Spade,
  },
  {
    id: 52,
    name: "K",
    symbol: "HEART",
    color: "RED",
    imageSrc: Images.default.Card_K_Heart,
  },

  {
    id: 53,
    name: "Joker",
    symbol: "JOKER",
    color: "BLACK",
    imageSrc: Images.default.Card_Joker_1,
  },
  {
    id: 54,
    name: "Joker",
    symbol: "JOKER",
    color: "RED",
    imageSrc: Images.default.Card_Joker_2,
  },
];

export default CardsArray;
