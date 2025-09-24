import { useCallback, useEffect, useState } from 'react';
import { ChatHeaderBar } from './ChatHeaderBar';
import { CHAT_TYPE } from '../types';
import { SearchChat } from './SearchChat';
import { MessageComposer } from './MessageComposer';
import { Chats } from './Chats';

export function SelectedConversationPane({
  chat,
  sendMessage,
  deleteMessage,
  editMessage,
}: {
  chat: CHAT_TYPE;
  sendMessage: (chatId: number, message: string) => void;
  deleteMessage: (chatId: number, messageId: number) => void;
  editMessage: (
    chatId: number,
    messageId: number,
    newMessageString: string
  ) => void;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleIsSeachOpen = useCallback(function () {
    setIsSearchOpen((prev) => !prev);
  }, []);

  const sendChatMessage = useCallback(function (message: string) {
    sendMessage(chat.id, message);
  }, []);

  const editChatMessage = useCallback(function (
    messageId: number,
    messageString: string
  ) {
    editMessage(chat.id, messageId, messageString);
  }, []);

  return (
    <section className="flex-grow-1 flex-shrink-2 overflow-x-auto flex h-full bg-darkFeather">
      <div className="flex-2 h-full flex flex-col">
        <ChatHeaderBar toggleSearch={handleIsSeachOpen} chatName={chat.name} />
        <Chats
          chat={chat}
          deleteMessage={(messageId) => {
            deleteMessage(chat.id, messageId);
          }}
          editMessage={editChatMessage}
        />
        <MessageComposer sendChatMessage={sendChatMessage} />
      </div>
      {isSearchOpen && (
        <SearchChat
          hideSearch={() => {
            setIsSearchOpen(false);
          }}
        />
      )}
    </section>
  );
}
