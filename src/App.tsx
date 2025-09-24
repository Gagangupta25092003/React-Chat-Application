import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CHAT_TYPE, MESSAGE_TYPE } from './types';
import { SelectedConversationPane } from './SelectedConversationPane';
import { PROFILE_IMAGE } from './constants';
import { CustomModal, MODAL_PROPS_WITH_CLOSE } from './CustomModal';
import { ListConversationsPane } from './ListConversationPane';

const chatsFilePath = '/data/chatsList.json';

type APP_MODE = 'Normal' | 'Compact';

export type APP_MODE_CONTEXT_TYPE = {
  mode: APP_MODE;
  switchMode: () => void;
};

export const AppModeContext = createContext({
  mode: 'Normal',
  switchMode: () => {},
} as APP_MODE_CONTEXT_TYPE);

export const AppModalContext = createContext({
  handlePromptModalProps: (
    onSuccessFunc: (input: string) => void,
    modalText: string,
    onCancelFunc?: () => void
  ) => {},
  handleOtherModalProps: (
    onSuccessFunc: () => void,
    modalText: string,
    modalType: 'Alert' | 'Confirm',
    onCancelFunc?: () => void
  ) => {},
  openModal: () => {},
});

function App() {
  // console.log('App Rendered');
  const [chats, setChats] = useState([] as Array<CHAT_TYPE>);
  const [appMode, setAppMode] = useState('Normal' as APP_MODE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProperties, setModalProperties] = useState({
    onSuccess: () => {},
    onCancel: () => {},
    text: '',
    type: 'Alert',
    closeModal: () => {},
  } as MODAL_PROPS_WITH_CLOSE);

  const [selectedChatId, setSelectedChatId] = useState(-1);

  function closeModal() {
    setModalProperties({
      onSuccess: () => {},
      onCancel: () => {},
      text: '',
      type: 'Alert',
      closeModal: () => {},
    });
    setIsModalOpen(false);
  }

  function handlePromptModalProps(
    onSuccessFunc: (input: string) => void,
    modalText: string,
    onCancelFunc?: () => void
  ) {
    setModalProperties({
      type: 'Prompt',
      text: modalText,
      onSuccess: onSuccessFunc,
      onCancel: onCancelFunc || (() => () => {}),
      closeModal: closeModal,
    });
  }

  function handleOtherModalProps(
    onSuccessFunc: () => void,
    modalText: string,
    modalType: 'Alert' | 'Confirm',
    onCancelFunc?: () => void
  ) {
    setModalProperties({
      type: modalType,
      text: modalText,
      onSuccess: onSuccessFunc,
      closeModal: closeModal,
      onCancel: onCancelFunc || (() => () => {}),
    });
  }

  function handleAppMode() {
    appMode == 'Normal' ? setAppMode('Compact') : setAppMode('Normal');
  }

  // console.log(chats);

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
    async function fetchChats(filePath: string) {
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
    fetchChats(chatsFilePath);
    return () => {
      ignore = true;
      // localStorage.clear();
    };
  }, []);

  const memoizedAppModeObject = useMemo(() => {
    return { mode: appMode, switchMode: handleAppMode };
  }, [appMode, handleAppMode]);

  const root = document.getElementById('App');

  return (
    <AppModeContext.Provider value={memoizedAppModeObject}>
      <AppModalContext.Provider
        value={{
          handlePromptModalProps,
          handleOtherModalProps,
          openModal: () => setIsModalOpen(true),
        }}
      >
        <div className="flex h-screen" id="App">
          <ListConversationsPane
            chats={chats}
            openChat={handleSelectedChatId}
            startNewChat={handleStartNewChat}
            deleteChat={handleDeleteChat}
          />
          {selectedChat ? (
            <SelectedConversationPane
              chat={selectedChat}
              sendMessage={handleSendChatMessage}
              deleteMessage={handleDeleteChatMessage}
              editMessage={handleEditChatMessage}
              key={selectedChat.id}
            />
          ) : (
            <div className="flex-grow-5 flex-shrink-5 bg-darkFeather"> </div>
          )}
          {isModalOpen && (root ? <CustomModal {...modalProperties} /> : null)}
        </div>
      </AppModalContext.Provider>
    </AppModeContext.Provider>
  );
}

export default App;
