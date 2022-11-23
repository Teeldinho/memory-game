import React from "react";
import Image from "next/image";

("use client");

const Home = () => {
  return (
    <div className="z-20 grid w-full h-screen place-items-center">
      <div className="flex flex-col items-center w-full h-full max-w-5xl gap-24 py-16">
        <h1 className="text-6xl font-bold">Are you ready to play?</h1>

        <p>Enter name</p>

        <button>Submit</button>
      </div>
    </div>
  );
};

export default Home;
