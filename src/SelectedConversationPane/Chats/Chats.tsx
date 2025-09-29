import { CHAT_TYPE } from '../../types';
import { Message } from './Message/';
import ContextMenu from '../../modules/ContextMenu/ContextMenu';
import { ButtonWithModal } from '../../modules/ButtonWithModal';
import { useHandleChatMessages } from './hooks/useHandleChatMessages';
import { useCallback } from 'react';

export type ChatsPropsType = {
  chat: CHAT_TYPE;
  deleteMessage: (messageId: number) => void;
  editMessage: (messageId: number, newMessageString: string) => void;
};

export function Chats({ chat, deleteMessage, editMessage }: ChatsPropsType) {
  const {
    isContextMenuOpen,
    contextMenuData,
    handleOpenContextMenu,
    closeContextMenu,
  } = useHandleChatMessages();

  const handleDeleteMessage = useCallback(() => {
    deleteMessage(contextMenuData.messageId);
  }, [deleteMessage]);
  const handleEditMessage = useCallback(
    (input: string) => {
      editMessage(contextMenuData.messageId, input);
    },
    [editMessage]
  );

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
          closeContextMenu={closeContextMenu}
        >
          <div className="flex flex-col rounded-md text-white bg-freinachtBlack">
            <ButtonWithModal
              size="Normal"
              type="Normal"
              modalPropObject={{
                text: 'Are you sure you want to delete the mesage?',
                type: 'Confirm',
                onSuccess: handleDeleteMessage,
                onCancel: () => {},
              }}
            >
              <img src="./delete.svg" className="w-4 aspect-square" />
              <h3>Delete</h3>
            </ButtonWithModal>
            <ButtonWithModal
              size="Normal"
              type="Normal"
              modalPropObject={{
                text: 'Edit the message!',
                type: 'Prompt',
                onSuccess: handleEditMessage,
                onCancel: () => {},
              }}
            >
              <img src="./delete.svg" className="w-4 aspect-square" />
              <h3>Edit</h3>
            </ButtonWithModal>
          </div>
        </ContextMenu>
      )}
    </div>
  );
}
