import { memo } from 'react';

const ChatHeaderBar = memo(function ({
  toggleSearch,
  chatName,
}: {
  toggleSearch: () => void;
  chatName: string;
}) {
  console.log('Rendering Chat Header Bar.');

  return (
    <div className="flex w-full p-4 bg-freinachtBlack text-white items-center gap-x-4">
      <img
        src="https://randomuser.me/api/portraits/women/1.jpg"
        className="w-10 aspect-square rounded-full"
      />
      <h2>{chatName}</h2>
      <div className="flex-1 flex justify-end gap-x-4">
        <img
          src="./search.svg"
          className="w-8 aspect-square rounded-full"
          onClick={toggleSearch}
        />
        <img src="./threeDots.svg" className="w-8 aspect-square rounded-full" />
      </div>
    </div>
  );
});

export default ChatHeaderBar;
