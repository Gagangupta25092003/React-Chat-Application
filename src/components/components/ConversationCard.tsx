import { memo } from 'react';
import { CHAT_TYPE } from '../../types';

const ConversationCard = memo(function ({
  chat,
  openChat,
}: {
  chat: CHAT_TYPE;
  openChat: (id: number) => void;
}) {
  // console.log(`Conversation Card Rendered Again For Chat ${chat.id}`);

  function getTruncatedMessage(message: string) {
    return message.length > 40 ? message.slice(0, 40) + '...' : message;
  }

  return (
    <button
      id={chat.id as unknown as string}
      className="flex w-full p-4 gap-x-4 border-t-1 border-freinachtBlack items-center hover:opacity-80"
      onClick={() => {
        openChat(chat.id);
      }}
    >
      <img
        src={chat.profileImg}
        alt={`${chat.name} Profile Image`}
        className="w-12 aspect-1 rounded-full"
      />
      <div className="text-start">
        <h2 className="text-white">{chat.name}</h2>
        <p className="text-gray-400">
          {chat.messages.length > 0
            ? getTruncatedMessage(
                chat.messages[chat.messages.length - 1]?.value
              )
            : null}
        </p>
      </div>
    </button>
  );
});

export default ConversationCard;
