import { useCallback, useEffect, useState } from 'react';
import ListConversationsPane from './components/ListConversationsPane';
import { CHAT_TYPE } from './types';
import SelectedConversationPane from './components/SelectedConversationPane';

const chatsFilePath = '/data/chatsList.json';

function App() {
  console.log('App Rendered');
  const [chats, setChats] = useState([] as Array<CHAT_TYPE>);
  const [selectedChatId, setSelectedChatId] = useState(-1);

  const handleSelectedChatId = useCallback(function (id: number) {
    setSelectedChatId(id);
  }, []);

  function handleSendChatMessage(chatId: number, message: string) {
    const newChats = chats.map((chat) => {
      if (chatId == chat.id) {
        const newChat = { ...chat };
        newChat.messages.push({
          recieved: false,
          value: message,
          created: Date(),
          id: chat.messages.length + 1,
        });
        return newChat;
      }
      return chat;
    });
    setChats(newChats);
  }

  function handleDeleteChatMessage(chatId: number, messageId: number) {
    const newChats = chats.map((chat) => {
      if (chatId == chat.id) {
        const newChat = { ...chat };
        newChat.messages = chat.messages.filter(
          (message) => messageId != message.id
        );
        return newChat;
      }
      return chat;
    });
    setChats(newChats);
  }

  const selectedChat = selectedChatId
    ? chats.find((chat) => chat.id == selectedChatId)
    : null;

  useEffect(() => {
    let ignore = false;
    async function fetchChats(filePath: string) {
      try {
        console.log('Fetching Chats...');
        const response = await fetch(filePath);
        const data: Array<CHAT_TYPE> = await response.json();
        if (ignore) {
          return;
        } else {
          console.log('Setting Chats...');
          setChats(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchChats(chatsFilePath);
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex h-screen">
      <ListConversationsPane chats={chats} openChat={handleSelectedChatId} />
      {selectedChat ? (
        <SelectedConversationPane
          chat={selectedChat}
          sendMessage={handleSendChatMessage}
          deleteMessage={handleDeleteChatMessage}
          key={selectedChat.id}
        />
      ) : (
        <div className="flex-3 bg-darkFeather"> </div>
      )}
    </div>
  );
}

export default App;
