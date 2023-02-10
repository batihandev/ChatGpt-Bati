"use client";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebasehelper";
import Message from "./Message";
import ScrollIntoView from "./ScrollIntoView";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
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

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started!
          </p>
        </>
      )}
      {messages?.docs.map((message, index) => (
        <div key={message.id + 2}>
          <Message key={message.id} message={message.data()} />

          <ScrollIntoView key={index + 1} />
        </div>
      ))}
    </div>
  );
}

export default Chat;
