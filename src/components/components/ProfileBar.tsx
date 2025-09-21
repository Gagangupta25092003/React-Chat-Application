export default function ProfileBar() {
  return (
    <div className="flex w-full p-4 bg-freinachtBlack items-center">
      <img
        src="https://randomuser.me/api/portraits/women/1.jpg"
        className="w-10 aspect-square rounded-full"
      />
      <div className="flex-1 flex justify-end gap-x-4">
        <img
          src="./nightMode.svg"
          className="w-8 aspect-square rounded-full fill-white"
        />
        <img src="./status.svg" className="w-8 aspect-square rounded-full" />
        <img src="./chats.svg" className="w-8 aspect-square rounded-full" />
        <img src="./threeDots.svg" className="w-8 aspect-square rounded-full" />
      </div>
    </div>
  );
}
