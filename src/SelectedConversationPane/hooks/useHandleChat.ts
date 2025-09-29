import { useCallback, useState } from 'react';
import { SelectedConversationPaneProps } from '../types';

type UseHandleChat = (params: {}) => void;

export function useHandleChat({
  chat,
  sendMessage,
  deleteMessage,
  editMessage,
}: SelectedConversationPaneProps) {
  const sendChatMessage = useCallback(
    function (message: string) {
      sendMessage(chat.id, message);
    },
    [chat]
  );

  const editChatMessage = useCallback(
    function (messageId: number, messageString: string) {
      editMessage(chat.id, messageId, messageString);
    },
    [chat]
  );
  const deleteChatMessage = useCallback(
    function (messageId: number) {
      deleteMessage(chat?.id, messageId);
    },
    [chat]
  );
  return { editChatMessage, sendChatMessage, deleteChatMessage };
}
