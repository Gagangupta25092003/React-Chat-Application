import { memo, MouseEvent, MouseEventHandler, useState } from 'react';
import { CHAT_TYPE } from '../../types';
import ContextMenu from './components/ContextMenu';

const ConversationCard = memo(function ({
  chat,
  openChat,
  openContextMenu,
}: {
  chat: CHAT_TYPE;
  openChat: (id: number) => void;
  openContextMenu: (e: MouseEvent<HTMLButtonElement>, chatId: number) => void;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCoords({ x: e.clientX, y: e.clientY });
  };

  function getTruncatedMessage(message: string) {
    const truncatedMsg =
      message.length > 40 ? message.slice(0, 40) + '...' : message;
    const newLineIndex = truncatedMsg.indexOf('\n');
    // console.log(truncatedMsg);
    // console.log(newLineIndex);
    return newLineIndex > -1
      ? truncatedMsg.slice(0, newLineIndex) + '...'
      : truncatedMsg;
  }

  return (
    <button
      id={chat.id as unknown as string}
      className="group  flex w-full p-4 gap-x-4 border-t-1 border-freinachtBlack items-center hover:opacity-80"
      onClick={() => {
        openChat(chat.id);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        openContextMenu(e, chat.id);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
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
      {hovered && chat.messages.length > 0 && (
        <p
          className="absolute bg-poolGreen text-white p-2 rounded z-50 whitespace-nowrap"
          style={{
            left: coords.x + 10, // offset to not overlap cursor
            top: coords.y + 10,
          }}
        >
          {getTruncatedMessage(chat.messages[chat.messages.length - 1]?.value)}
        </p>
      )}
    </button>
  );
});

export default ConversationCard;
