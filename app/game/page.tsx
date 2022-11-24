import PlayerCard from "components/PlayerCard";
import React from "react";

import AvatarPlayer1 from "@/assets/Player1.png";
import AvatarPlayer2 from "@/assets/Player2.png";
import Card from "components/Card";

const player1 = {
  id: 1,
  name: "Player 1",
  score: 10,
  avatar: AvatarPlayer1,
};

const player2 = {
  id: 2,
  name: "Player 2",
  score: 12,
  avatar: AvatarPlayer2,
};

const Game = () => {
  return (
    <div className="z-20 flex items-center w-full h-screen gap-8">
      {/* Player 1 Card showing name and score  */}
      <PlayerCard {...player1} myTurn={true} />

      {/* Grid to render the cards: */}
      <div className="w-full p-8 rounded-lg bg-gradient-glassy">
        <div className="grid grid-cols-9 grid-rows-6 gap-8">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />

          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />

          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />

          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />

          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />

          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>

      {/* Player 2 Card showing name and score  */}
      <PlayerCard {...player2} myTurn={false} />
    </div>
  );
};

export default Game;
