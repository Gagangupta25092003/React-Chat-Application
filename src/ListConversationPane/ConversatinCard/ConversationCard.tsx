import { memo, MouseEvent, useCallback, useContext } from 'react';
import { CHAT_TYPE } from '../../types';
import { AppModeContext } from '../../contexts';
import { useHandleToolTip } from './hooks/useHandleToolTip';

export type ConversatinCardPropsType = {
  chat: CHAT_TYPE;
  openChat: (id: number) => void;
  openContextMenu: (e: MouseEvent<HTMLButtonElement>, chatId: number) => void;
};
const getTruncatedMessage = (message: string) => {
  const truncatedMsg =
    message.length > 40 ? message.slice(0, 40) + '...' : message;
  const newLineIndex = truncatedMsg.indexOf('\n');
  return newLineIndex > -1
    ? truncatedMsg.slice(0, newLineIndex) + '...'
    : truncatedMsg;
};

export const ConversationCard = memo(function ({
  chat,
  openChat,
  openContextMenu,
}: ConversatinCardPropsType) {
  const appModeObject = useContext(AppModeContext);

  const { hovered, tooltipPos, buttonRef, handleMouseEnter, handleMouseLeave } =
    useHandleToolTip();

  const handleContextMenu = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      openContextMenu(e, chat.id);
    },
    [chat]
  );

  const handleOpenChat = useCallback(() => openChat(chat.id), [chat]);

  return (
    <button
      ref={buttonRef}
      id={chat.id as unknown as string}
      className="group relative flex w-full p-4 gap-x-4 border-t border-freinachtBlack items-center"
      onClick={handleOpenChat}
      onContextMenu={handleContextMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={chat.profileImg}
        alt={`${chat.name} Profile Image`}
        className="w-12 aspect-square rounded-full"
      />
      <div className="text-start">
        <h2 className="text-white">{chat.name}</h2>
        <p className="text-gray-400">
          {chat.messages.length > 0 && appModeObject.mode === 'Normal'
            ? getTruncatedMessage(
                chat.messages[chat.messages.length - 1]?.value
              )
            : null}
        </p>
      </div>

      {hovered && tooltipPos && chat.messages.length > 0 && (
        <div
          className="fixed bg-poolGreen text-white p-2 rounded z-50 shadow  whitespace-pre-line"
          style={{
            top: tooltipPos.top,
            left: tooltipPos.left - 10,
            transform: 'translateY(-50%)', // perfectly center vertically
          }}
        >
          {chat.messages[chat.messages.length - 1]?.value}
        </div>
      )}
    </button>
  );
});
