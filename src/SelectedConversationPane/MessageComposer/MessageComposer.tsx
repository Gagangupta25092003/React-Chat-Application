import { memo, useState } from 'react';
import { useHandleChatInput } from './hooks/useHandleChatInput';

export type MessageComposerType = {
  sendChatMessage: (message: string) => void;
};

export const MessageComposer = memo(function ({
  sendChatMessage,
}: MessageComposerType) {
  const {
    newMessage,
    handleNewMessage,
    handleSendChatMessage,
    handleKeyboardDown,
  } = useHandleChatInput({
    sendChatMessage,
  });

  return (
    <div className="p-4 flex gap-x-4 bg-freinachtBlack">
      <img
        src="./attachment.svg"
        className="text-freinachtBlack w-6 aspect-square"
      />
      <textarea
        className=" text-white p-4  bg-darkFeather flex-1 rounded-xl"
        placeholder="Type a message here .."
        value={newMessage}
        onChange={(e) => {
          handleNewMessage(e.target.value);
        }}
        onKeyDown={handleKeyboardDown}
      />
      <img
        src="./send.svg"
        className="text-freinachtBlack w-8 aspect-square"
        onClick={handleSendChatMessage}
      />
    </div>
  );
});
