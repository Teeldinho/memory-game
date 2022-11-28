"use client";

import PlayerCard from "components/PlayerCard";
import Card, { ICard } from "components/Card";
import { useEffect, useState } from "react";
import { useMemoryStore } from "store/store";
import shallow from "zustand/shallow";
import CardMatching from "@/assets/Match.png";
import Image from "next/image";

const Game = () => {
  // get players and cards from our global state:
  const {
    storePlayers,
    storeCards,
    storeFetchCards,
    storeRemoveCardsMatchedDialog,
    storeCardsMatchFound,
  } = useMemoryStore(
    (state) => ({
      storePlayers: state.players,
      storeCards: state.cards,
      storeRemoveCardsMatchedDialog: state.removeCardsMatchedDialog,
      storeFetchCards: state.fetchCards,
      storeCardsMatchFound: state.cardsMatchFound,
    }),
    shallow,
  );

  // reset player scores on render:
  // run once to fetch card data and shuffle them:
  useEffect(() => {
    storeFetchCards();
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
    <div className="z-20 flex items-center w-full h-screen gap-16">
      {/* Player 1 Card showing name and score  */}
      <PlayerCard {...storePlayers[0]} />

      {/* Grid to render the cards: */}
      <div className="relative w-full p-8 rounded-lg bg-gradient-glassy">
        {/* CardMatching */}

        {storeCardsMatchFound && (
          <div className="absolute top-0 left-0 z-50 w-full h-full">
            <Image src={CardMatching} fill alt="Card Matching" />
          </div>
        )}

        <div className="grid grid-cols-9 grid-rows-6 gap-8">
          {storeCards?.map((card: ICard, count: number) => (
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
