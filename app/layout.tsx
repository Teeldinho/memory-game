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

import { BsPhoneLandscape } from "react-icons/bs";

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

      <body className="relative mx-auto h-screen w-screen select-none overflow-hidden bg-gradient-radial bg-no-repeat p-4 text-white lg:max-w-[1440px]">
        {/* decorate page with background circles: */}
        <PageDecoration />
        {/* If a winner is found, show overlay of results:
        Otherwise, show the game: */}

        {storeWinnerFound ? (
          <WinnerAnnouncement />
        ) : (
          <>
            <div className="grid w-full h-full px-2 text-center place-items-center landscape:hidden">
              <div className="flex flex-col items-center gap-8">
                <BsPhoneLandscape className="w-16 h-16 animate-bounce" />

                <h1 className="text-3xl font-medium">
                  Please turn your device into landscape mode to play the game.
                </h1>
              </div>
            </div>

            <div className="flex flex-col w-full h-full gap-2 portrait:hidden">
              <Header />
              {children}
            </div>
          </>
        )}
      </body>
    </html>
  );
}
