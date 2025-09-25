export type SearchChatPropsType = { hideSearch: () => void };

export function SearchChat({ hideSearch }: SearchChatPropsType) {
  return (
    <div className="flex-1 h-full border-l-2 border-freinachtBlack">
      <div className="p-4 h-18 flex items-center text-white bg-freinachtBlack gap-x-4">
        <img
          src="./cross.svg"
          className="w-8 aspect-square"
          onClick={hideSearch}
        />
        <h2>Search</h2>
      </div>
      <div className="w-full p-4 border-b-2 border-freinachtBlack">
        <input
          className=" w-full border-none bg-freinachtBlack text-sm py-2 px-4 text-white rounded-xl"
          placeholder="Search or start a new chat"
        />
      </div>
    </div>
  );
}
