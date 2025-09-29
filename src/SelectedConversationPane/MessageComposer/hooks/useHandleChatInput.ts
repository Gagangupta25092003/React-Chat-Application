import { KeyboardEvent, useState } from 'react';

type useHandleChatInputType = ({
  sendChatMessage,
}: {
  sendChatMessage: (msg: string) => void;
}) => {
  newMessage: string;
  handleNewMessage: (msg: string) => void;
  handleSendChatMessage: () => void;
  handleKeyboardDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export const useHandleChatInput: useHandleChatInputType = function ({
  sendChatMessage,
}) {
  const [newMessage, setNewMessage] = useState('');

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

  function handleKeyboardDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setNewMessage((prev) => prev + '\n');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSendChatMessage();
    }
  }

  return {
    newMessage,
    handleNewMessage,
    handleSendChatMessage,
    handleKeyboardDown,
  };
};
