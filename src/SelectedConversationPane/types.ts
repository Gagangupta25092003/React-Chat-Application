import { CHAT_TYPE } from '../types';

export type SelectedConversationPaneProps = {
  chat: CHAT_TYPE;
  sendMessage: (chatId: number, message: string) => void;
  deleteMessage: (chatId: number, messageId: number) => void;
  editMessage: (
    chatId: number,
    messageId: number,
    newMessageString: string
  ) => void;
};
