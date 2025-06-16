"use client";

import { Particles } from "@/components/magicui/particles";
import Image from "next/image";

type Props = {
  userName: string;
};

export function UserBanner({ userName }: Props) {
  return (
    <div className="relative flex flex-col justify-center items-center bg-primary/10 rounded-lg w-full lg:h-[270px] h-fit py-6 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="z-10 max-w-7xl flex flex-col lg:flex-row justify-between items-center gap-6 w-full">
        <div className="flex flex-col gap-3 text-center lg:text-left">
          <p className="font-bold text-3xl sm:text-4xl">
            <span className="font-normal">Hi, </span>
            {userName}
          </p>
          <p className="text-sm sm:text-base md:text-lg max-w-xl text-muted-foreground">
            Hello, I am Zakaria AI, your personal assistant. I can help you with
            managing your store, answering questions, and providing insights.
            <br />
            <span className="font-semibold">How can I assist you today?</span>
          </p>
        </div>

        <Image
          src="/images/zakaria/zakaria-hi.gif"
          alt="zakaria ai"
          width={300}
          height={300}
          className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-contain mt-4 lg:mt-20 hidden sm:block"
        />
      </div>

      <Particles
        className="z-0 absolute inset-0"
        quantity={50}
        size={1.5}
        ease={80}
        color="#22c55e"
        refresh
      />
      <Particles
        className="z-0 absolute inset-0"
        quantity={25}
        size={1}
        ease={80}
        color="#8b5cf6"
        refresh
      />
      <Particles
        className="z-0 absolute inset-0"
        quantity={25}
        size={1}
        ease={80}
        color="#3b82f6"
        refresh
      />
    </div>
  );
}
