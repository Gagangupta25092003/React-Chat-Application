import { useEffect, useState } from 'react';
import { MESSAGE_TYPE } from '../../../types';

export default function Message({
  message,
  deleteMessage,
}: {
  message: MESSAGE_TYPE;
  deleteMessage: () => void;
}) {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    setIsPopUpVisible(true);
  }

  const createdDate = new Date(message.created);
  useEffect(() => {
    function handleClick() {
      // console.log('Mouse Pressed!');
      setIsPopUpVisible(false);
    }
    if (isPopUpVisible) {
      document.addEventListener('click', handleClick);
      // console.log('Event Listener Added');
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isPopUpVisible]);
  return (
    <div
      className={
        'relative max-w-96 p-2 align-self rounded-md  text-white ' +
        (message.recieved ? `bg-freinachtBlack` : `bg-poolGreen self-end `) +
        (message.value.length < 20 ? 'flex gap-2 items-baseline' : '')
      }
      onContextMenu={handleContextMenu}
    >
      {message.value}
      <div className="text-gray-300 text-end text-xs">
        {createdDate.getHours() + ':' + createdDate.getMinutes()}
      </div>

      {isPopUpVisible && (
        <div
          className="absolute top-0 left-0 p-2 flex gap-x-4 rounded-md bg-freinachtBlack hover:bg-red-400"
          onClick={() => {
            // console.log('Chat Message Deleted');
            let response = confirm(
              'Are you sure you want to delete the message. '
            );
            if (response) deleteMessage();
          }}
        >
          <p>Delete</p>
          <img src="./delete.svg" className="w-3 aspect-square" />
        </div>
      )}
    </div>
  );
}
