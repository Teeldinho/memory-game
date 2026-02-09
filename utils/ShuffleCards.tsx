import { ICard } from "components/Card";

const ShuffleCards = (cards: ICard[]) => {
  // shuffle the cards randomly:
  return [...cards].sort(() => Math.random() - 0.5);
};

export { ShuffleCards };
