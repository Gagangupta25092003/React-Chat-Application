import { MouseEvent, useState } from 'react';
import { CHAT_TYPE } from '../../types';
import { Message } from './Message/';
import ContextMenu from '../../components/ContextMenu';
import ButtonWithModal from '../../components/ButtonWithModal';

export function Chats({
  chat,
  deleteMessage,
  editMessage,
}: {
  chat: CHAT_TYPE;
  deleteMessage: (messageId: number) => void;
  editMessage: (messageId: number, newMessageString: string) => void;
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
          <div className="flex flex-col rounded-md text-white bg-freinachtBlack">
            <ButtonWithModal
              size="Normal"
              type="Normal"
              modalPropObject={{
                text: 'Are you sure you want to delete the mesage?',
                type: 'Confirm',
                onSuccess: () => {
                  deleteMessage(contextMenuData.messageId);
                },
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
                onSuccess: (input) => {
                  editMessage(contextMenuData.messageId, input);
                },
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
