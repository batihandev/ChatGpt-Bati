"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { chatgptlogo } from "../assets/img";

type Props = {};

export const Login = ({}: Props) => {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image src={chatgptlogo} alt="Logo" width={300} height={300} />
      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign In to use ChatGPT
      </button>
    </div>
  );
};
