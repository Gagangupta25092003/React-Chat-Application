import { CHAT_TYPE } from '../types';
import ConversationCard from './components/ConversationCard';
import ProfileBar from './components/ProfileBar';
import SearchChatsBar from './components/SearchChatsBar';

export default function ListConversationsPane({
  chats,
  openChat,
}: {
  chats: Array<CHAT_TYPE>;
  openChat: (id: number) => void;
}) {
  return (
    <div className="flex-1 border-r-2 border-freinachtBlack h-full overflow-y-scroll bg-darkFeather ">
      <ProfileBar />
      <SearchChatsBar />
      {chats.map((chat) => {
        return (
          <ConversationCard chat={chat} key={chat.id} openChat={openChat} />
        );
      })}
    </div>
  );
}
