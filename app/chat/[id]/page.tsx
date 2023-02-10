import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};
const ChatPage = ({ params: { id } }: Props) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
};

export default ChatPage;
