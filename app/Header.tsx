import React from "react";

const Header = () => {
  return (
    <header className="relative flex justify-end w-full py-8">
      <div className="absolute right-[46%]">
        <h1 className="text-4xl font-bold">Memory</h1>
      </div>

      <div className="flex gap-8">
        <button className="text-xl font-bold bg-[#F4A236] p-4 rounded-lg">
          Restart Game
        </button>

        <button className="text-xl font-bold bg-[#D4190C] p-4 rounded-lg">
          Exit Game
        </button>
      </div>
    </header>
  );
};

export default Header;
