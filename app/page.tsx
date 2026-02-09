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

const FORM_ERRORS = {
  PLAYER_1_REQUIRED: "Player 1 name is required.",
  PLAYER_2_REQUIRED: "Player 2 name is required.",
} as const;

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
      shallow
    );

  // Use React Hook Form to capture and validate input:
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = (data) => {
    // reset store and update the player names:
    storeSetNames(data.namePlayer1.trim(), data.namePlayer2.trim());
    storeResetStore();

    // start the game:
    storeStartGame();

    // redirect to the game screen:
    router.push("/game");
  };

  // fetch cards upon loading:
  useEffect(() => {
    // fetch cards:
    storeFetchCards();
  }, []);

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center py-4 lg:py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6 rounded-xl bg-gradient-mobile px-4 py-8 sm:px-8 md:px-10 lg:gap-16 lg:bg-none lg:px-16">
        {/* HEADING QUESTION: */}
        <h1 className="text-center text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Are you ready to play?
        </h1>

        {/* AVATARS AND NAME INPUT BOX */}

        <form
          className="mx-auto flex h-full w-full max-w-4xl flex-col items-center gap-8 lg:gap-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-16">
            {/* CARD 2 */}
            <div className="flex flex-col items-center gap-4 lg:gap-8">
              <div className="relative aspect-square h-16 w-16 bg-transparent lg:h-44 lg:w-44">
                <Image src={AvatarPlayer1} fill alt="Player 1 Avatar" />
              </div>

              <div className="w-full">
                <input
                  {...register("namePlayer1", {
                    required: FORM_ERRORS.PLAYER_1_REQUIRED,
                    validate: (value) =>
                      value.trim().length > 0 || FORM_ERRORS.PLAYER_1_REQUIRED,
                  })}
                  type="text"
                  aria-invalid={Boolean(errors.namePlayer1)}
                  aria-describedby="name-player-1-error"
                  className="form-control m-0 block w-full rounded-lg border-2 border-solid border-blue-200 bg-white bg-clip-padding px-4 py-2 text-sm font-normal text-blue-900 transition ease-in-out placeholder:text-sm placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none md:text-base lg:border-blue-400 lg:py-4 lg:placeholder:text-base"
                  placeholder="Name of Player 1"
                />

                {errors.namePlayer1 && (
                  <p
                    id="name-player-1-error"
                    role="alert"
                    className="mt-2 text-sm font-semibold text-action-danger"
                  >
                    {errors.namePlayer1.message}
                  </p>
                )}
              </div>
            </div>

            {/* CARD 2 */}
            <div className="flex flex-col items-center gap-4 lg:gap-8">
              <div className="relative aspect-square h-16 w-16 bg-transparent lg:h-44 lg:w-44">
                <Image src={AvatarPlayer2} fill alt="Player 2 Avatar" />
              </div>

              <div className="w-full">
                <input
                  {...register("namePlayer2", {
                    required: FORM_ERRORS.PLAYER_2_REQUIRED,
                    validate: (value) =>
                      value.trim().length > 0 || FORM_ERRORS.PLAYER_2_REQUIRED,
                  })}
                  type="text"
                  aria-invalid={Boolean(errors.namePlayer2)}
                  aria-describedby="name-player-2-error"
                  className="form-control m-0 block w-full rounded-lg border-2 border-solid border-blue-200 bg-white bg-clip-padding px-4 py-2 text-sm font-normal text-blue-900 transition ease-in-out placeholder:text-sm placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none md:text-base lg:border-blue-400 lg:py-4 lg:placeholder:text-base"
                  placeholder="Name of Player 2"
                />

                {errors.namePlayer2 && (
                  <p
                    id="name-player-2-error"
                    role="alert"
                    className="mt-2 text-sm font-semibold text-action-danger"
                  >
                    {errors.namePlayer2.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* PLAY BUTTON */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mx-auto rounded-lg bg-action-info py-2 px-8 text-base font-bold uppercase text-brand-heading shadow-sm hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 lg:bg-action-success lg:px-16 lg:py-4 lg:text-xl lg:capitalize lg:text-white"
          >
            Let's Play
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
