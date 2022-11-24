import React from "react";

const Header = () => {
  return (
    <header className="absolute top-0 right-0 w-full">
      <div className="relative flex justify-end w-full py-8 ">
        <div className="absolute right-[46%]">
          <h1 className="text-4xl font-bold">Memory</h1>
        </div>

        <div className="flex gap-8">
          <button className="rounded-lg bg-[#F4A236] p-4 text-xl font-bold hover:opacity-90">
            Restart Game
          </button>

          <button className="rounded-lg bg-[#D4190C] p-4 text-xl font-bold hover:opacity-90">
            Exit Game
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
