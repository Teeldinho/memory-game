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

  const { storeStartGame, storeResetStore, storeFetchCards, storeSetNames } =
    useMemoryStore(
      (state) => ({
        storeStartGame: state.startGame,
        storeResetStore: state.resetStore,
        storeFetchCards: state.fetchCards,
        storeSetNames: state.setNames,
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
    // fetch cards:
    storeFetchCards();

    // reset store and update the player names:
    storeSetNames(data.namePlayer1.trim(), data.namePlayer2.trim());
    storeResetStore();

    // start the game:
    storeStartGame();

    // redirect to the game screen:
    router.push("/game");
  };

  return (
    <div className="p-4 lg:mt-28">
      <div className="mx-auto flex h-min w-[60vw]  flex-col items-center justify-center gap-4 rounded-xl bg-gradient-mobile p-4 lg:h-full lg:max-w-4xl lg:gap-16 lg:bg-none">
        {/* HEADING QUESTION: */}
        <h1 className="text-2xl font-bold lg:text-6xl">
          Are you ready to play?
        </h1>

        {/* AVATARS AND NAME INPUT BOX */}

        <form
          className="flex flex-col items-center w-full h-full gap-6 mx-auto lg:gap-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid w-full grid-cols-2 gap-8 lg:gap-16">
            {/* CARD 2 */}
            <div className="flex flex-col items-center gap-4 lg:gap-8">
              <div className="relative w-24 h-24 bg-transparent aspect-square lg:h-44 lg:w-44">
                <Image src={AvatarPlayer1} fill alt="Player 1 Avatar" />
              </div>

              <div className="w-full">
                <input
                  {...register("namePlayer1", { required: true })}
                  type="text"
                  className="block w-full px-4 py-2 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid form-control rounded-xl bg-clip-padding focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none lg:py-4"
                  placeholder="Name of Player 1"
                />
              </div>
            </div>

            {/* CARD 2 */}
            <div className="flex flex-col items-center gap-4 lg:gap-8">
              <div className="relative w-24 h-24 bg-transparent aspect-square lg:h-44 lg:w-44">
                <Image src={AvatarPlayer2} fill alt="Player 2 Avatar" />
              </div>

              <div className="w-full">
                <input
                  {...register("namePlayer2", { required: true })}
                  type="text"
                  className="block w-full px-4 py-2 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid form-control rounded-xl bg-clip-padding focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none lg:py-4"
                  placeholder="Name of Player 2"
                />
              </div>
            </div>
          </div>
          {/* PLAY BUTTON */}

          <button
            type="submit"
            className="mx-auto rounded-xl bg-[#A7DAFF] py-2 px-8 text-base font-bold uppercase text-[#164464] shadow-sm hover:opacity-90 lg:bg-[#0AB169] lg:px-16 lg:py-4 lg:text-xl lg:capitalize lg:text-white"
          >
            Let's Play
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
