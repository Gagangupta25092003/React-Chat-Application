import { MouseEvent, useState } from 'react';
import { CHAT_TYPE } from '../../types';
import Message from './components/Message';
import ContextMenu from './components/ContextMenu';

export default function Chats({
  chat,
  deleteMessage,
}: {
  chat: CHAT_TYPE;
  deleteMessage: (messageId: number) => void;
}) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuData, setContextMenuData] = useState({
    x: 0,
    y: 0,
    messageId: -1,
  });

  const handleOpenContextMenu = (
    e: MouseEvent<HTMLDivElement>,
    messageId: number
  ) => {
    setContextMenuData({
      x: e.clientX,
      y: e.clientY,
      messageId: messageId,
    });
    setIsContextMenuOpen(true);
  };
  return (
    <div className="w-full h-full border-red-50 p-4 flex flex-col overflow-y-auto gap-y-2 ">
      {chat.messages &&
        chat.messages.map((message) => (
          <Message
            message={message}
            key={message.id}
            openContextMenu={handleOpenContextMenu}
          />
        ))}

      {isContextMenuOpen && (
        <ContextMenu
          contextMenuData={contextMenuData}
          closeContextMenu={() => {
            setIsContextMenuOpen(false);
          }}
        >
          <button
            className="flex gap-x-4 p-2"
            onClick={() => {
              deleteMessage(contextMenuData.messageId);
            }}
          >
            <p>Delete</p>
            <img src="./delete.svg" className="w-4 aspect-square" />
          </button>
        </ContextMenu>
      )}
    </div>
  );
}
