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
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  //access global state:
  const { storeWinnerFound } = useMemoryStore(
    (state) => ({
      storeWinnerFound: state.winnerFound,
    }),
    shallow
  );

  if (!hasMounted) {
    return (
      <html className={customFont.className}>
        <head />

        <body className="relative min-h-screen select-none overflow-x-hidden bg-gradient-radial bg-no-repeat text-white">
          <PageDecoration />
          <div className="min-h-screen w-full" />
        </body>
      </html>
    );
  }

  return (
    <html className={customFont.className}>
      <head />

      <body className="relative min-h-screen select-none overflow-x-hidden bg-gradient-radial bg-no-repeat text-white">
        {/* decorate page with background circles: */}
        <PageDecoration />
        {/* If a winner is found, show overlay of results:
        Otherwise, show the game: */}

        {storeWinnerFound ? (
          <WinnerAnnouncement />
        ) : (
          <>
            <div className="grid min-h-screen w-full place-items-center px-4 text-center landscape:hidden">
              <div className="flex flex-col items-center gap-8 justify-self-center">
                <BsPhoneLandscape className="h-16 w-16 animate-bounce" />

                <h1 className="text-3xl font-medium">
                  Please turn your device into landscape mode to play the game.
                </h1>
              </div>
            </div>

            <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-2 px-4 py-4 lg:px-8 lg:py-6 portrait:hidden">
              <Header />
              {children}
            </div>
          </>
        )}
      </body>
    </html>
  );
}
