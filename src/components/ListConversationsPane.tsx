import { MouseEvent, useCallback, useState } from 'react';
import { CHAT_TYPE } from '../types';
import ConversationCard from './components/ConversationCard';
import ProfileBar from './components/ProfileBar';
import SearchChatsBar from './components/SearchChatsBar';
import ContextMenu from './components/components/ContextMenu';
import Button from './components/components/Button';
import ButtonWithModal from './components/components/ButtonWithModal';

export default function ListConversationsPane({
  chats,
  openChat,
  startNewChat,
  deleteChat,
}: {
  chats: Array<CHAT_TYPE>;
  openChat: (id: number) => void;
  startNewChat: (name: string) => void;
  deleteChat: (id: number) => void;
}) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const [contextMenuData, setContextMenuData] = useState({
    x: 0,
    y: 0,
    chatId: -1,
  });

  const handleOpenContextMenu = (
    e: MouseEvent<HTMLButtonElement>,
    chatId: number
  ) => {
    setContextMenuData({
      x: e.clientX,
      y: e.clientY,
      chatId: chatId,
    });
    setIsContextMenuOpen(true);
  };

  const startNewChatWithPrompt = useCallback(
    function () {
      const chatName = prompt('Enter Chat Name', 'Lakshya');
      if (!chatName) {
        alert('Chat Name cannot be empty');
      } else {
        // console.log(`Chat Name: ${chatName}`);
        startNewChat(chatName);
      }
    },
    [startNewChat]
  );

  if (chats.length == 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-y-4 bg-darkFeather p-4 border-r-2 border-freinachtBlack">
        <h2 className="text-white">No Conversations Yet!</h2>
        <ButtonWithModal
          modalPropObject={{
            type: 'Prompt',
            text: 'Enter the Chat Name: ',
            onSuccess: startNewChat,
            onCancel: () => {},
          }}
          type="Normal"
          size="Large"
        >
          <p>Add a new Chat</p>
        </ButtonWithModal>
      </div>
    );
  }
  // console.log(chats);
  return (
    <div className="flex-grow-0 basis-md flex-shrink-1 border-r-2 border-freinachtBlack h-full overflow-y-scroll bg-darkFeather ">
      <ProfileBar startNewChat={startNewChat} />
      <SearchChatsBar />
      {chats.map((chat) => {
        return (
          <ConversationCard
            chat={chat}
            key={chat.id}
            openChat={openChat}
            openContextMenu={handleOpenContextMenu}
          />
        );
      })}
      {isContextMenuOpen && (
        <ContextMenu
          closeContextMenu={() => {
            setIsContextMenuOpen(false);
          }}
          contextMenuData={contextMenuData}
        >
          <ButtonWithModal
            type="Green"
            size="Normal"
            modalPropObject={{
              type: 'Confirm',
              text: 'Are you sure you want to delete Chat!',
              onCancel: () => {},
              onSuccess: () => {
                deleteChat(contextMenuData.chatId);
                setIsContextMenuOpen(false);
              },
            }}
          >
            <div className="flex gap-x-4">
              <p>Delete</p>
              <img src="./delete.svg" className="w-4 aspect-square" />
            </div>
          </ButtonWithModal>
        </ContextMenu>
      )}
    </div>
  );
}
