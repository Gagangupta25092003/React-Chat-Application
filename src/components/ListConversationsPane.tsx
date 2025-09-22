import { CHAT_TYPE } from '../types';
import ConversationCard from './components/ConversationCard';
import ProfileBar from './components/ProfileBar';
import SearchChatsBar from './components/SearchChatsBar';

export default function ListConversationsPane({
  chats,
  openChat,
  startNewChat,
}: {
  chats: Array<CHAT_TYPE>;
  openChat: (id: number) => void;
  startNewChat: (id: string) => void;
}) {
  if (chats.length == 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-y-4 bg-darkFeather p-4 border-r-2 border-freinachtBlack">
        <h2 className="text-white">No Conversations Yet!</h2>
        <button
          onClick={() => {
            const chatName = prompt('Enter Chat Name', 'Lakshya');
            if (!chatName) {
              alert('Chat Name cannot be empty');
            } else {
              console.log(`Chat Name: ${chatName}`);
              startNewChat(chatName);
            }
          }}
          className="bg-freinachtBlack text-white p-4 rounded-xl"
        >
          Start A New Chat
        </button>
      </div>
    );
  }
  console.log(chats);
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
