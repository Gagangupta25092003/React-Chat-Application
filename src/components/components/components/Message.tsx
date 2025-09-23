import { MouseEvent, useEffect, useState } from 'react';
import { MESSAGE_TYPE } from '../../../types';
import ContextMenu from './ContextMenu';

export default function Message({
  message,
  openContextMenu,
}: {
  message: MESSAGE_TYPE;
  openContextMenu: (e: MouseEvent<HTMLDivElement>, messageId: number) => void;
}) {
  const createdDate = new Date(message.created);

  return (
    <div
      className={
        'relative max-w-96 p-2 align-self rounded-md  text-white whitespace-pre-line ' +
        (message.recieved ? `bg-freinachtBlack` : `bg-poolGreen self-end `) +
        (message.value.length < 20 ? 'flex gap-2 items-baseline' : '')
      }
      onContextMenu={(e) => {
        e.preventDefault();
        openContextMenu(e, message.id);
      }}
    >
      {message.value}
      <div className="text-gray-300 text-end text-xs">
        {createdDate.getHours() + ':' + createdDate.getMinutes()}
      </div>
    </div>
  );
}
