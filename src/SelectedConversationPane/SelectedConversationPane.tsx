import { ChatHeaderBar } from './ChatHeaderBar';
import { SearchChat } from './SearchChat';
import { MessageComposer } from './MessageComposer';
import { Chats } from './Chats';
import { SelectedConversationPaneProps } from './types';
import { useHandleSearch } from './hooks/useHandleSearch';
import { useHandleChat } from './hooks/useHandleChat';

export function SelectedConversationPane({
  chat,
  sendMessage,
  deleteMessage,
  editMessage,
}: SelectedConversationPaneProps) {
  const { isSearchOpen, hideSearch, toggleSearch } = useHandleSearch();
  const { editChatMessage, sendChatMessage, deleteChatMessage } = useHandleChat(
    { chat, sendMessage, deleteMessage, editMessage }
  );

  return (
    <section className="flex-grow-1 flex-shrink-2 overflow-x-auto flex h-full bg-darkFeather">
      <div className="flex-2 h-full flex flex-col">
        <ChatHeaderBar toggleSearch={toggleSearch} chatName={chat.name} />
        <Chats
          chat={chat}
          deleteMessage={deleteChatMessage}
          editMessage={editChatMessage}
        />
        <MessageComposer sendChatMessage={sendChatMessage} />
      </div>
      {isSearchOpen && <SearchChat hideSearch={hideSearch} />}
    </section>
  );
}
