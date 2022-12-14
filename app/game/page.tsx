"use client";

import PlayerCard from "components/PlayerCard";
import Card, { ICard } from "components/Card";
import { useEffect } from "react";
import { useMemoryStore } from "store/store";
import shallow from "zustand/shallow";
import CardMatchFoundOverlay from "components/CardMatchFoundOverlay";
import PlayerCardMobile from "components/PlayerCardMobile";

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
    shallow,
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
    if (storeCardsMatchFound)
      setTimeout(() => {
        storeRemoveCardsMatchedDialog();
      }, 1000);
  }, [storeCardsMatchFound]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 mt-2 lg:mt-8 lg:flex-row lg:gap-16">
      {/* Player 1 Card showing name and score  */}
      {/* This card is hidden on mobile: */}
      <PlayerCard {...storePlayers[0]} />

      {/* Grid to render the cards: */}
      <div className="relative w-full h-full p-3 mt-3 overflow-hidden rounded-xl bg-gradient-glassy lg:mt-0 lg:p-8">
        {/* CardMatching */}
        {storeCardsMatchFound && (
          <div className="absolute top-0 left-0 z-30 grid w-full h-full overflow-hidden rounded-xl ">
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
          {storeCards.map((card: ICard, count: number) => (
            <Card key={count} {...card} />
          ))}
        </div>
      </div>

      {/* Mobile player card and game score: */}
      {/* This card is hidden on large screens: */}
      <div className="flex items-center w-full lg:hidden">
        {/* Player 1 Card showing name and turn to play  */}
        <PlayerCardMobile {...storePlayers[0]} />

        {/* Score card: */}
        <div className="px-4 w-min bg-none">
          <h2 className="text-base font-semibold text-center">Score</h2>
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
