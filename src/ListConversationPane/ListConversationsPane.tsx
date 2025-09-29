import { memo, MouseEvent, useCallback, useState } from 'react';
import { CHAT_TYPE } from '../types';
import { SearchChatsBar } from './SearchChatsBar';
import ContextMenu from '../modules/ContextMenu/ContextMenu';
import { ButtonWithModal } from '../modules/ButtonWithModal';
import { ProfileHeader } from './ProfileHeader';
import { ConversationCard } from './ConversatinCard';
import { useHandleContextMenu } from './hooks/useHandleContextMenu';

export type ListConversationPanePropsType = {
  chats: Array<CHAT_TYPE>;
  openChat: (id: number) => void;
  startNewChat: (name: string) => void;
  deleteChat: (id: number) => void;
};

export const ListConversationsPane = memo(function ({
  chats,
  openChat,
  startNewChat,
  deleteChat,
}: ListConversationPanePropsType) {
  const {
    isContextMenuOpen,
    contextMenuData,
    handleOpenContextMenu,
    handleCloseContextMenu,
  } = useHandleContextMenu();

  const handleDeleteChat = useCallback(() => {
    deleteChat(contextMenuData.chatId);
  }, [contextMenuData, deleteChat]);

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
      <ProfileHeader startNewChat={startNewChat} />
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
          closeContextMenu={handleCloseContextMenu}
          contextMenuData={contextMenuData}
        >
          <ButtonWithModal
            type="Green"
            size="Normal"
            modalPropObject={{
              type: 'Confirm',
              text: 'Are you sure you want to delete Chat!',
              onCancel: () => {},
              onSuccess: handleDeleteChat,
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
});
