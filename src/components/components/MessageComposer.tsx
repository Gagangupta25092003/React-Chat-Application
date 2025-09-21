import { memo, useState } from 'react';

const MessageComposer = memo(function ({
  sendChatMessage,
}: {
  sendChatMessage: (message: string) => void;
}) {
  const [newMessage, setNewMessage] = useState('');
  console.log('Rendered Message Composer!');
  function handleNewMessage(msg: string) {
    msg = msg[0].toUpperCase() + msg.slice(1);
    setNewMessage(msg);
  }

  return (
    <div className="p-4 flex gap-x-4 bg-freinachtBlack">
      <img
        src="./attachment.svg"
        className="text-freinachtBlack w-6 aspect-square"
      />
      <input
        className=" text-white p-4  bg-darkFeather flex-1 rounded-xl"
        placeholder="Type a message here .."
        value={newMessage}
        onChange={(e) => {
          handleNewMessage(e.target.value);
        }}
      />
      <img
        src="./send.svg"
        className="text-freinachtBlack w-8 aspect-square"
        onClick={() => {
          if (newMessage) {
            sendChatMessage(newMessage);
            setNewMessage('');
          }
        }}
      />
    </div>
  );
});

export default MessageComposer;
