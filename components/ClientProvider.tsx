"use client";
import { Toaster } from "react-hot-toast";

type Props = {};

function ClientProvider(props: Props) {
  return (
    <>
      <Toaster position="top-right"></Toaster>
    </>
  );
}

export default ClientProvider;
