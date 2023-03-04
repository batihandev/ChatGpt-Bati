"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../firebasehelper";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  chatId: string;
};
function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const [chatGpt, setChatGpt] = useState(false);
  const [messages, setMessages] = useState<any>([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [toBeMessages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );
  useEffect(() => {
    const _messages: { role: string; content: string }[] = [
      { role: "system", content: "You are a helpful assistant." },
    ];
    toBeMessages?.forEach((message) => {
      _messages.push({
        role:
          message.data().user._id == session?.user?.email!
            ? "user"
            : "assistant",
        content: message.data().text,
      });
    });
    setMessages(_messages);

    return () => {
      setMessages([
        { role: "system", content: "You are a helpful assistant." },
      ]);
    };
  }, [toBeMessages]);

  //useSWR to get model

  const { data: model } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo-0301",
  });
  useEffect(() => {
    if (model == "gpt-3.5-turbo-0301") {
      setChatGpt(true);
    }

    return () => {
      setChatGpt(false);
    };
  }, [model]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");
    messages.push({ role: "user", content: input });
    setMessages(messages);
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui—avatars.com/api/?name=${session?.user?.name}`,
      },
    };
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
        chatGpt,
        messages,
      }),
    }).then(() => {
      toast.success("ChatGPT has responded!", {
        id: notification,
      });
    });
  };

  return (
    <div className="rounded-lg bg-gray-700/50 text-sm text-gray-400 ">
      <form onSubmit={sendMessage} className="flex space-x-5 p-5">
        <input
          className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300 "
          value={prompt}
          disabled={!session}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Type your message here..."
        />
        <button
          type="submit"
          disabled={!prompt || !session}
          className="rounded bg-[#11A37F] px-4 py-2 font-bold text-white hover:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div className="sm:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
