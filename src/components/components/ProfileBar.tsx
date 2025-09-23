import { createPortal } from 'react-dom';
import Button from './components/Button';
import CustomModal from './components/CustomModal';
import ButtonWithModal from './components/ButtonWithModal';

export default function ProfileBar({
  startNewChat,
}: {
  startNewChat: (message: string) => void;
}) {
  return (
    <div className="flex w-full p-4 bg-freinachtBlack items-center gap-x-8">
      <img
        src="https://randomuser.me/api/portraits/women/1.jpg"
        className="w-10 aspect-square rounded-full"
      />
      <div className="flex-1 flex justify-end gap-x-4">
        <img
          src="./nightMode.svg"
          className="w-8 aspect-square rounded-full fill-white hidden xl:block"
        />
        <img
          src="./status.svg"
          className="w-8 aspect-square rounded-full hidden xl:block"
        />
        <img
          src="./chats.svg"
          className="w-8 aspect-square rounded-full hidden xl:block"
        />
        <img
          src="./threeDots.svg"
          className="w-8 aspect-square rounded-full xl:hidden"
        />
        <ButtonWithModal
          modalPropObject={{
            type: 'Prompt',
            text: 'Enter the Chat Name: ',
            onSuccess: startNewChat,
            onCancel: () => {},
          }}
          type="Success"
          size="Large"
        >
          <p>Add a new Chat</p>
        </ButtonWithModal>
      </div>
    </div>
  );
}
