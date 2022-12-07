"use client";

import PlayerCard from "components/PlayerCard";
import Card, { ICard } from "components/Card";
import { useEffect } from "react";
import { useMemoryStore } from "store/store";
import shallow from "zustand/shallow";
import CardMatching from "@/assets/Match.png";
import Image from "next/image";
import CardMatchFoundOverlay from "components/CardMatchFoundOverlay";

const Game = () => {
  // get players and cards from our global state:
  const {
    storePlayers,
    storeCards,
    storeRemoveCardsMatchedDialog,
    storeCardsMatchFound,
    storeResetStore,
    storeStartGame,
    storeShuffleCards,
    storeResetCardsProperties,
  } = useMemoryStore(
    (state) => ({
      storePlayers: state.players,
      storeCards: state.cards,
      storeRemoveCardsMatchedDialog: state.removeCardsMatchedDialog,
      storeResetStore: state.resetStore,
      storeShuffleCards: state.shuffleCards,
      storeCardsMatchFound: state.cardsMatchFound,
      storeResetCardsProperties: state.resetCardsProperties,
      storeStartGame: state.startGame,
    }),
    shallow,
  );

  // reset store on render:
  // run once to fetch card data and shuffle them:
  useEffect(() => {
    // reset the card properties:
    storeResetCardsProperties(storeCards);

    storeResetStore(
      storePlayers.map(
        (player, index) => player.name || "Player " + index.toString(),
      ),
    );

    // shuffle the cards twice:
    // storeShuffleCards();
    // storeShuffleCards();

    // start the game:
    storeStartGame();
  }, []);

  // useEffect to remove the matched dialog:
  useEffect(() => {
    // remove the matched overlay after a few seconds:
    if (storeCardsMatchFound)
      setTimeout(() => {
        storeRemoveCardsMatchedDialog();
      }, 500);
  }, [storeCardsMatchFound]);

  return (
    <div className="flex h-full w-full items-center lg:-mt-16 lg:gap-16">
      {/* <div className="flex items-center w-full h-screen gap-16 -mt-16"> */}
      {/* Player 1 Card showing name and score  */}

      <PlayerCard {...storePlayers[0]} />

      {/* Grid to render the cards: */}
      <div className="relative w-full rounded-xl bg-gradient-glassy p-8">
        {/* CardMatching */}
        {storeCardsMatchFound && (
          <div className="absolute top-0 left-0 grid h-full w-full overflow-hidden rounded-xl">
            <CardMatchFoundOverlay />
          </div>
        )}

        <div
          className={`grid w-full grid-cols-9 grid-rows-6 gap-8 ${
            storeCardsMatchFound ? "invisible" : ""
          } `}
        >
          {storeCards.map((card: ICard, count: number) => (
            <Card key={count} {...card} />
          ))}
        </div>
      </div>

      {/* Player 2 Card showing name and score  */}
      <PlayerCard {...storePlayers[1]} />
    </div>
  );
};

export default Game;
