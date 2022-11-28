"use client";

import PlayerCard from "components/PlayerCard";
import Card, { ICard } from "components/Card";
import { useEffect, useState } from "react";
import { useMemoryStore } from "store/store";
import shallow from "zustand/shallow";

const Game = () => {
  // get players and cards from our global state:
  const { storePlayers, storeCards, storeFetchCards } = useMemoryStore(
    (state) => ({
      storePlayers: state.players,
      storeCards: state.cards,
      storeFetchCards: state.fetchCards,
    }),
    shallow,
  );

  // reset player scores on render:
  // run once to fetch card data and shuffle them:
  useEffect(() => {
    storeFetchCards();
  }, []);

  return (
    <div className="z-20 flex items-center w-full h-screen gap-16">
      {/* Player 1 Card showing name and score  */}
      <PlayerCard {...storePlayers[0]} />

      {/* Grid to render the cards: */}
      <div className="w-full p-8 rounded-lg bg-gradient-glassy">
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
