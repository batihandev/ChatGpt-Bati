"use client";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { chatgptAvatar } from "../assets/img";
type Props = {
  message: DocumentData;
};
function Message({ message }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";
  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="mx-auto flex max-w-2xl space-x-5 px-10">
        {isChatGPT ? (
          <Image
            alt="ChatGPT"
            src={chatgptAvatar}
            width={32}
            height={32}
            className="h-8 w-8"
          />
        ) : (
          <img src={message.user.avatar} alt="" className="h-8 w-8" />
        )}

        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
