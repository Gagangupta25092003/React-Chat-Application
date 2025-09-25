import { useCallback, useEffect, useMemo, useState } from 'react';
import { CHAT_TYPE, MESSAGE_TYPE } from '../types';
import { PROFILE_IMAGE } from '../constants';
import { ListConversationPanePropsType } from '../ListConversationPane/ListConversationsPane';
import { SelectedConversationPaneProps } from '../SelectedConversationPane/types';

export function useHandleChats() {
  const [chats, setChats] = useState([] as Array<CHAT_TYPE>);

  const [selectedChatId, setSelectedChatId] = useState(-1);

  function handleSetChats(newChats: Array<CHAT_TYPE>) {
    // console.log('Handle Set Chats Called');
    const newChatsJson = JSON.stringify(newChats);
    localStorage.setItem('chats', newChatsJson);
    // console.log(newChatsJson);
    setChats(newChats);
  }

  const handleSelectedChatId = useCallback(function (id: number) {
    // console.log(id);
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
    handleSetChats(newChats);
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
    handleSetChats(newChats);
  }

  function handleEditChatMessage(
    chatId: number,
    messageId: number,
    newMessageString: string
  ) {
    const newChats = chats.map((chat) => {
      if (chatId == chat.id) {
        const newChat = { ...chat };
        newChat.messages = chat.messages.map((message) => {
          if (message.id != messageId) {
            return message;
          } else {
            const newMessage = {
              ...message,
              value: newMessageString,
            };
            return newMessage;
          }
        });
        return newChat;
      }
      return chat;
    });
    handleSetChats(newChats);
  }

  const handleStartNewChat = useCallback(
    function (chatName: string) {
      // console.log(chats.length);

      const newKey = Math.max(
        chats.reduce((acc, chat) => Math.max(chat.id, acc), -1) + 1,
        1
      );
      console.log(newKey);
      const newChat = {
        name: chatName,
        id: newKey,
        profileImg: PROFILE_IMAGE,
        messages: [] as Array<MESSAGE_TYPE>,
      };
      const newChats = [...chats, newChat];
      // console.log('New Chat Array');
      // console.log(newChats);
      // console.log('Previous Chat Array');
      // console.log(chats);
      handleSetChats(newChats);
    },
    [chats]
  );

  function handleDeleteChat(chatId: number) {
    const newChats = chats.filter((chat) => chatId != chat.id);
    handleSetChats(newChats);
  }

  const selectedChat = selectedChatId
    ? chats.find((chat) => chat.id == selectedChatId)
    : null;

  useEffect(() => {
    let ignore = false;
    async function fetchChats() {
      try {
        // console.log('Fetching Chats...');
        const jsonData = localStorage.getItem('chats');
        if (!jsonData) {
          // console.log('No Chat History!');
          return;
        }
        const data: Array<CHAT_TYPE> = JSON.parse(jsonData);
        if (ignore) {
          return;
        } else {
          // console.log('Setting Chats...');
          setChats(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchChats();
    return () => {
      ignore = true;
      // localStorage.clear();
    };
  }, []);

  const listConversationProps: ListConversationPanePropsType = {
    chats: chats,
    openChat: handleSelectedChatId,
    startNewChat: handleStartNewChat,
    deleteChat: handleDeleteChat,
  };
  const selectedConversationPaneProps: SelectedConversationPaneProps = {
    chat: selectedChat,
    sendMessage: handleSendChatMessage,
    deleteMessage: handleDeleteChatMessage,
    editMessage: handleEditChatMessage,
  };

  return { listConversationProps, selectedConversationPaneProps };
}
