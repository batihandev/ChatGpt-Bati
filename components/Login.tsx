"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { chatgptlogo } from "../assets/img";

type Props = {};
function trySignIn() {
  signIn("google").catch((e) => console.log(e));
}
const Login = ({}: Props) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#11A37F] text-center">
      <Image src={chatgptlogo} alt="Logo" width={300} height={300} />
      <button
        onClick={trySignIn}
        className="animate-pulse text-3xl font-bold text-white"
      >
        Sign In to use ChatGPT
      </button>
    </div>
  );
};

export default Login;
