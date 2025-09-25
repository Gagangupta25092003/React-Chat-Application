import { memo, useState } from 'react';

export type MessageComposerType = {
  sendChatMessage: (message: string) => void;
};

export const MessageComposer = memo(function ({
  sendChatMessage,
}: MessageComposerType) {
  const [newMessage, setNewMessage] = useState('');
  // console.log('Rendered Message Composer!');
  function handleNewMessage(msg: string) {
    if (!msg) {
      setNewMessage('');
      return;
    }
    msg = msg[0].toUpperCase() + msg.slice(1);
    setNewMessage(msg);
  }

  function handleSendChatMessage() {
    if (newMessage) {
      sendChatMessage(newMessage);
      setNewMessage('');
    }
  }

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
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            setNewMessage((prev) => prev + '\n');
          } else if (e.key === 'Enter') {
            e.preventDefault();
            handleSendChatMessage();
          }
        }}
      />
      <img
        src="./send.svg"
        className="text-freinachtBlack w-8 aspect-square"
        onClick={handleSendChatMessage}
      />
    </div>
  );
});
