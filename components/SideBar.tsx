"use client";
import { useSession, signOut } from "next-auth/react";
import { NewChat } from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebasehelper";
import { ChatRow } from "./ChatRow";
import { ModelSelection } from "./ModelSelection";
type Props = {};

export const SideBar = (props: Props) => {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex h-screen flex-col p-2">
      <div className="flex-1">
        <div>
          <NewChat />
          <div className="hidden sm:inline">
            <ModelSelection />
          </div>

          <div className="my-2 flex flex-col space-y-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="Profile pic"
          className="mx-auto mb-2 h-12 w-12 cursor-pointer rounded-full hover:opacity-50"
        />
      )}
    </div>
  );
};
