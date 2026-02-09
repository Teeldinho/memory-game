"use client";

import CardBack from "@/assets/Card_Back.png";
import Image from "next/image";
import { useMemoryStore } from "store/store";
import shallow from "zustand/shallow";
import { GAME_DELAYS, GAME_RULES } from "utils/gameConfig";

export interface ICard {
  id: string;
  name: string;
  symbol: string;
  color: string;
  image: string;
  flipped: boolean;
  matched: boolean;
}

const Card = (card: ICard) => {
  const {
    storeAnnounceWinner,
    storeToggleTurn,
    storeSetCardsMatched,
    storeIncreasePlayerScore,
    storeClearSelectedCards,
    storeAddSelectedCard,
    storeCardIsFlipped,
  } = useMemoryStore(
    (state) => ({
      storeAnnounceWinner: state.announceWinner,
      storeToggleTurn: state.toggleTurn,
      storeSetCardsMatched: state.setCardsMatched,
      storeIncreasePlayerScore: state.increasePlayerScore,
      storeClearSelectedCards: state.clearSelectedCards,
      storeAddSelectedCard: state.addSelectedCard,
      storeCardIsFlipped: state.cardIsFlipped,
    }),
    shallow
  );

  // helper function for finding matches:
  const cardsDoMatch = (selectedCards: ICard[]): boolean => {
    const [firstCard, secondCard] = selectedCards;

    if (!firstCard || !secondCard) {
      return false;
    }

    // check if the selected cards have matching numbers (symbols):
    if (firstCard.name.toLowerCase() !== secondCard.name.toLowerCase()) {
      return false;
    }

    // check if the cards are jokers:
    if (firstCard.name.toLowerCase() === GAME_RULES.JOKER_NAME) {
      return true;
    }

    // else check if the colors of non-Joker cards match:
    return firstCard.color.toLowerCase() === secondCard.color.toLowerCase();
  };

  // handle the card flips:
  const handleCardFlip = () => {
    const previousSelectedCardsCount =
      useMemoryStore.getState().selectedCards.length;

    storeAddSelectedCard(card);

    const latestStoreState = useMemoryStore.getState();
    const nextSelectedCards = latestStoreState.selectedCards;

    if (nextSelectedCards.length === previousSelectedCardsCount) {
      return;
    }

    // only check if cards match if there are exactly 2 cards flipped:
    if (nextSelectedCards.length !== GAME_RULES.REQUIRED_SELECTED_CARDS) {
      return;
    }

    // Determine the result:
    if (cardsDoMatch(nextSelectedCards)) {
      // set the cards to matching, so they can be hidden from board:
      storeSetCardsMatched(nextSelectedCards[0], nextSelectedCards[1]);

      const activePlayer = latestStoreState.players.find(
        (player) => player.turnToPlay
      );

      // increase the player's score if they found a match:
      if (activePlayer) {
        storeIncreasePlayerScore(activePlayer.id);
      }

      // check if it's the last 2 cards that are not matched:
      const unmatchedCards = latestStoreState.cards.filter((existingCard) => {
        return existingCard.matched === false;
      });

      // trigger a results overlay when EVERY card has been matched:
      if (unmatchedCards.length === GAME_RULES.REQUIRED_SELECTED_CARDS) {
        storeClearSelectedCards();
        storeAnnounceWinner(true);

        return;
      }
    } else {
      // Cards are NOT a match:
      // switch player turns:
      storeToggleTurn();
    }

    setTimeout(() => {
      // clear the selected cards:
      storeClearSelectedCards();
    }, GAME_DELAYS.MATCH_OVERLAY_MS);
  };

  return (
    <div
      className={`group max-h-20 min-h-[3.5rem] cursor-pointer select-none overflow-hidden rounded-sm ease-in-out [perspective:1000px] hover:scale-110 hover:opacity-80 lg:h-20 ${
        card.matched ? "invisible" : ""
      }`}
      onClick={handleCardFlip}
    >
      <div
        className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${
          storeCardIsFlipped(card) ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 h-full w-full transition-all duration-500 [backface-visibility:hidden]">
          <Image src={CardBack} fill alt="Card Back" />
        </div>

        <div className="absolute inset-0 h-full w-full transition-all duration-500 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <Image src={card.image} fill alt="Card Front" />
        </div>
      </div>
    </div>
  );
};

export default Card;
