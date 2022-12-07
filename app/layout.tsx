"use client";

import "../styles/globals.css";
import Header from "./Header";

// Install Poppins font:
import { Poppins } from "@next/font/google";
import { useEffect, useState } from "react";
import { useMemoryStore } from "store/store";
import shallow from "zustand/shallow";
import WinnerAnnouncement from "components/WinnerAnnouncement";
import PageDecoration from "components/PageDecoration";

// Select font weights:
const customFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //access global state:
  const { storeWinnerFound } = useMemoryStore(
    (state) => ({
      storeWinnerFound: state.winnerFound,
    }),
    shallow,
  );

  useEffect(() => {
    if (storeWinnerFound) console.log("WINNER FOUND!");
  }, [storeWinnerFound]);

  return (
    <html className={customFont.className}>
      <head />

      <body className="relative mx-auto h-screen w-screen overflow-hidden bg-gradient-radial bg-no-repeat p-4 text-white lg:max-w-[1440px]">
        {/* <body className="relative mx-auto h-screen w-full max-w-[1440px] overflow-hidden bg-gradient-radial bg-no-repeat text-white portrait:hidden"> */}

        {/* decorate page with background circles: */}
        {/* <PageDecoration /> */}

        {/* If a winner is found, show overlay of results:
        Otherwise, show the game: */}
        {storeWinnerFound ? (
          <WinnerAnnouncement />
        ) : (
          <div className="flex flex-col w-full h-full gap-2">
            <Header />
            {children}
          </div>
        )}

        {/* <h1 className="portrait:text-center portrait:text-5xl portrait:font-bold">
          Please turn your phone into landscape mode to play game.
        </h1> */}
      </body>
    </html>
  );
}
