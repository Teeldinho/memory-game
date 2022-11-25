"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import AvatarPlayer1 from "@/assets/Player1.png";
import AvatarPlayer2 from "@/assets/Player2.png";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMemoryStore } from "store/store";

type TInputs = {
  namePlayer1: string;
  namePlayer2: string;
};

const Home = () => {
  // router for navigating pages:
  const router = useRouter();

  // Get our global state functions:
  const updateNames = useMemoryStore((state) => state.setNames);
  const startGame = useMemoryStore((state) => state.toggleStartGame);

  // Use React Hook Form to capture and validate input:
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = (data) => {
    updateNames([data.namePlayer1, data.namePlayer2]);

    // start game:
    startGame();
    // navigate to start game:
    router.push("/game");
  };

  return (
    <div className="z-20 mt-32 grid h-screen w-full place-items-center">
      <div className="flex h-full w-full max-w-4xl flex-col items-center gap-20 py-16">
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
              <div className="relative grid h-60 w-full place-items-center bg-transparent">
                <Image src={AvatarPlayer1} alt="Player 1 Avatar" />
              </div>

              <div className="w-full">
                <input
                  {...register("namePlayer1", { required: true })}
                  type="text"
                  className="form-control m-0 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-4 font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Name of Player 1"
                />
              </div>
            </div>

            {/* CARD 1 */}
            <div className="flex flex-col items-center gap-8">
              <div className="relative grid h-60 w-full place-items-center bg-transparent">
                <Image src={AvatarPlayer2} alt="Player 2 Avatar" />
              </div>

              <div className="w-full">
                <input
                  {...register("namePlayer2", { required: true })}
                  type="text"
                  className="form-control m-0 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-4 font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
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
