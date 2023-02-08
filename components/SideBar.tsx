import React from "react";
import { NewChat } from "./NewChat";

type Props = {};

export const SideBar = (props: Props) => {
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* newchat */}
          <NewChat />
          <div>{/* ModelSelection */}</div>
          {/* Map through the chartows */}
        </div>
      </div>
    </div>
  );
};
