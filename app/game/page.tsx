"use client";

import PlayerCard from "components/PlayerCard";
import Card, { ICard } from "components/Card";
import { useEffect } from "react";
import { useMemoryStore } from "store/store";
import shallow from "zustand/shallow";
import CardMatchFoundOverlay from "components/CardMatchFoundOverlay";
import PlayerCardMobile from "components/PlayerCardMobile";
import { GAME_DELAYS } from "utils/gameConfig";

const Game = () => {
  // get players and cards from our global state:
  const {
    storePlayers,
    storeCards,
    storeRemoveCardsMatchedDialog,
    storeCardsMatchFound,
    storeRestartGame,
    storeGameStarted,
    storeSelectedCards,
  } = useMemoryStore(
    (state) => ({
      storePlayers: state.players,
      storeCards: state.cards,
      storeGameStarted: state.gameStarted,
      storeRemoveCardsMatchedDialog: state.removeCardsMatchedDialog,
      storeSelectedCards: state.selectedCards,
      storeCardsMatchFound: state.cardsMatchFound,
      storeRestartGame: state.restartGame,
    }),
    shallow
  );

  // reset store on render:
  // run once to fetch card data and shuffle them:
  useEffect(() => {
    // restart game:
    storeRestartGame();
  }, []);

  // useEffect to remove the matched dialog:
  useEffect(() => {
    // remove the matched overlay after a few seconds:
    if (!storeCardsMatchFound) {
      return;
    }

    const timeoutId = setTimeout(() => {
      storeRemoveCardsMatchedDialog();
    }, GAME_DELAYS.MATCH_OVERLAY_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [storeCardsMatchFound]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-2 lg:mt-6 lg:flex-row lg:gap-16">
      {/* Player 1 Card showing name and score  */}
      {/* This card is hidden on mobile: */}
      <PlayerCard {...storePlayers[0]} />

      {/* Grid to render the cards: */}
      <div className="relative mt-2 h-full w-full overflow-hidden rounded-xl bg-gradient-glassy p-3 lg:mt-0 lg:p-8">
        {/* CardMatching */}
        {storeCardsMatchFound && (
          <div className="absolute top-0 left-0 z-30 grid h-full w-full overflow-hidden rounded-xl ">
            <CardMatchFoundOverlay />
          </div>
        )}

        <div
          className={`z-10 grid h-full w-full select-none grid-cols-18 grid-rows-3 gap-2 lg:grid-cols-9 lg:grid-rows-6 lg:gap-8 ${
            storeCardsMatchFound ? "invisible" : ""
          } ${
            storeSelectedCards.length > 1 || !storeGameStarted
              ? "pointer-events-none cursor-wait"
              : "pointer-events-auto cursor-default"
          }`}
        >
          {storeCards.map((card: ICard) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>

      {/* Mobile player card and game score: */}
      {/* This card is hidden on large screens: */}
      <div className="flex w-full items-center lg:hidden">
        {/* Player 1 Card showing name and turn to play  */}
        <PlayerCardMobile {...storePlayers[0]} />

        {/* Score card: */}
        <div className="w-min bg-none px-4">
          <h2 className="text-center text-base font-semibold">Score</h2>
        </div>

        {/* Player 2 Card showing name and turn to play  */}
        <PlayerCardMobile {...storePlayers[1]} />
      </div>

      {/* Player 2 Card showing name and score  */}
      {/* This card is hidden on mobile screens: */}
      <PlayerCard {...storePlayers[1]} />
    </div>
  );
};

export default Game;
