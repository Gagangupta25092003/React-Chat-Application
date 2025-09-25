import { useCallback, useState } from 'react';
import { SelectedConversationPaneProps } from '../types';

export function useHandleChat({
  chat,
  sendMessage,
  deleteMessage,
  editMessage,
}: SelectedConversationPaneProps) {
  const sendChatMessage = useCallback(function (message: string) {
    sendMessage(chat?.id || -1, message);
  }, []);

  const editChatMessage = useCallback(function (
    messageId: number,
    messageString: string
  ) {
    editMessage(chat?.id || -1, messageId, messageString);
  }, []);
  const deleteChatMessage = useCallback(function (messageId: number) {
    deleteMessage(chat?.id || -1, messageId);
  }, []);
  return { editChatMessage, sendChatMessage, deleteChatMessage };
}
