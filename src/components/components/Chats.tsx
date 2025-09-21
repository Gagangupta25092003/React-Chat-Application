import { CHAT_TYPE } from '../../types';
import Message from './components/Message';

export default function Chats({
  chat,
  deleteMessage,
}: {
  chat: CHAT_TYPE;
  deleteMessage: (messageId: number) => void;
}) {
  return (
    <div className="w-full h-full border-red-50 p-4 flex flex-col overflow-y-auto gap-y-2 ">
      {chat.messages &&
        chat.messages.map((message) => (
          <Message
            message={message}
            key={message.id}
            deleteMessage={() => {
              deleteMessage(message.id);
            }}
          />
        ))}
    </div>
  );
}
