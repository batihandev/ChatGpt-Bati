import { PlusIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {};
export const NewChat = (props: Props) => {
  return (
    <div>
      <PlusIcon className=" h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
};
