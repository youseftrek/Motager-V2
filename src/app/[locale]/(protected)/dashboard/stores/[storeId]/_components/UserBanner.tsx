"use client";

import { Particles } from "@/components/magicui/particles";
import Image from "next/image";

type Props = {
  userName: string;
};

export function UserBanner({ userName }: Props) {
  return (
    <div className="relative flex flex-col justify-center items-center bg-gradient-to-br from-primary/20 to-transparent rounded-lg w-full h-[270px] overflow-hidden">
      <div className="z-10 flex justify-between items-center px-5 sm:px-9 lg:px-48 w-full leading-none whitespace-pre-wrap pointer-events-none">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-4xl ltr:text-left rtl:text-right">
            <span className="font-normal">Hi, </span>
            {userName}
          </p>
          <p className="max-w-[800px] text-muted-foreground">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>
        <Image
          src="/images/zakaria/zakaria-hi.gif"
          alt="zakaria ai"
          width={270}
          height={270}
          className="hidden md:block mt-28 w-[100px] md:w-[400px] object-top align-top"
        />
      </div>
      <Particles
        className="z-0 absolute inset-0"
        quantity={400}
        ease={80}
        color="#22c55e"
        refresh
      />
    </div>
  );
}
