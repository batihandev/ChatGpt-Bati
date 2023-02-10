"use client";
import { Toaster } from "react-hot-toast";

type Props = {};

export const ClientProvider = (props: Props) => {
  return (
    <>
      <Toaster position="top-right"></Toaster>
    </>
  );
};
