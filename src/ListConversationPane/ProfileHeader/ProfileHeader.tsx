import { MouseEvent, useContext, useState } from 'react';
import ButtonWithModal from '../../components/ButtonWithModal';
import ContextMenu from '../../components/ContextMenu';
import { AppModeContext } from '../../App';

export function ProfileHeader({
  startNewChat,
}: {
  startNewChat: (message: string) => void;
}) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuData, setContextMenuData] = useState({
    x: 0,
    y: 0,
  });

  const appModeObject = useContext(AppModeContext);

  const handleOpenContextMenu = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('Opening Context Menu');
    setContextMenuData({
      x: e.clientX,
      y: e.clientY,
    });
    setIsContextMenuOpen(true);
    e.stopPropagation();
  };

  return (
    <div className="flex w-full p-4 bg-freinachtBlack items-center gap-x-8">
      <img
        src="https://randomuser.me/api/portraits/women/1.jpg"
        className="w-10 aspect-square rounded-full"
      />
      <div className="flex-1 flex justify-end gap-x-4">
        <button
          onClick={handleOpenContextMenu}
          className="py-2 hover:bg-darkFeather rounded-md"
        >
          <img
            src="./threeDots.svg"
            className="w-8 aspect-square rounded-full "
          />
        </button>
        {isContextMenuOpen && (
          <ContextMenu
            closeContextMenu={() => {
              setIsContextMenuOpen(false);
            }}
            contextMenuData={contextMenuData}
          >
            <div className="flex flex-col rounded-md text-white bg-freinachtBlack">
              <button className="flex gap-x-4 hover:bg-darkFeather p-4 items-center">
                <img
                  src="./nightMode.svg"
                  className="w-8 aspect-square rounded-full fill-white "
                />
                <h2>Night Mode</h2>
              </button>
              <button className="flex gap-x-4 hover:bg-darkFeather p-4 items-center">
                <img
                  src="./status.svg"
                  className="w-8 aspect-square rounded-full "
                />
                <h2>Status</h2>
              </button>
              <button className="flex gap-x-4 hover:bg-darkFeather p-4 items-center">
                <img
                  src="./chats.svg"
                  className="w-8 aspect-square rounded-full "
                />
                <h2>Chats</h2>
              </button>
              <button
                className="flex gap-x-4 hover:bg-darkFeather p-4 items-center"
                onClick={appModeObject.switchMode}
              >
                {appModeObject.mode == 'Normal' ? (
                  <img src="./switch-left.svg" className="w-8  rounded-full " />
                ) : (
                  <img
                    src="./switch-right.svg"
                    className="w-8  rounded-full "
                  />
                )}
                <h2>{appModeObject.mode}</h2>
              </button>
            </div>
          </ContextMenu>
        )}
      </div>
      <ButtonWithModal
        modalPropObject={{
          type: 'Prompt',
          text: 'Enter the Chat Name: ',
          onSuccess: startNewChat,
          onCancel: () => {},
        }}
        type="Green"
        size="Large"
      >
        <p>Add a new Chat</p>
      </ButtonWithModal>
    </div>
  );
}
