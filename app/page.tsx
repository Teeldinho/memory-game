"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import AvatarPlayer1 from "@/assets/Player1.png";
import AvatarPlayer2 from "@/assets/Player2.png";

import shallow from "zustand/shallow";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMemoryStore } from "store/store";
import { useEffect } from "react";

type TInputs = {
  namePlayer1: string;
  namePlayer2: string;
};

const Home = () => {
  // router for navigating pages:
  const router = useRouter();

  const { storeStartGame, storeResetStore, storeFetchCards } = useMemoryStore(
    (state) => ({
      storeStartGame: state.startGame,
      storeResetStore: state.resetStore,
      storeFetchCards: state.fetchCards,
    }),
    shallow,
  );

  // Use React Hook Form to capture and validate input:
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = (data) => {
    // reset store and update the player names:
    storeResetStore([data.namePlayer1.trim(), data.namePlayer2.trim()]);

    // fetch and shuffle cards
    storeFetchCards();

    // start the game:
    storeStartGame();

    // redirect to the game screen:
    router.push("/game");
  };

  return (
    <div className="z-20 grid w-full h-screen place-items-center">
      <div className="flex flex-col items-center justify-center w-full h-full max-w-4xl gap-20 py-48">
        {/* HEADING QUESTION: */}
        <h1 className="text-6xl font-bold">Are you ready to play?</h1>

        {/* AVATARS AND NAME INPUT BOX */}

        <form
          className="flex flex-col items-center gap-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid w-full grid-cols-2 gap-16">
            {/* CARD 1 */}
            <div className="flex flex-col items-center gap-8">
              <div className="relative grid w-full bg-transparent h-60 place-items-center">
                <Image src={AvatarPlayer1} alt="Player 1 Avatar" />
              </div>

              <div className="w-full">
                <input
                  {...register("namePlayer1", { required: true })}
                  type="text"
                  className="block w-full px-4 py-4 m-0 font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded-lg form-control bg-clip-padding focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Name of Player 1"
                />
              </div>
            </div>

            {/* CARD 1 */}
            <div className="flex flex-col items-center gap-8">
              <div className="relative grid w-full bg-transparent h-60 place-items-center">
                <Image src={AvatarPlayer2} alt="Player 2 Avatar" />
              </div>

              <div className="w-full">
                <input
                  {...register("namePlayer2", { required: true })}
                  type="text"
                  className="block w-full px-4 py-4 m-0 font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded-lg form-control bg-clip-padding focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Name of Player 2"
                />
              </div>
            </div>
          </div>
          {/* PLAY BUTTON */}

          <div className="mx-auto">
            <button
              type="submit"
              className="rounded-lg bg-[#0AB169]  py-4 px-16 text-xl font-bold hover:opacity-90"
            >
              Let's Play
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
