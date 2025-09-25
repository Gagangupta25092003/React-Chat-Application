import { MouseEvent, useContext, useEffect, useState } from 'react';
import { MESSAGE_TYPE } from '../../../types';
import { AppModeContext } from '../../../contexts';

export type MessagePropsType = {
  message: MESSAGE_TYPE;
  openContextMenu: (e: MouseEvent<HTMLDivElement>, messageId: number) => void;
};

export function Message({ message, openContextMenu }: MessagePropsType) {
  const createdDate = new Date(message.created);
  const appModeObject = useContext(AppModeContext);

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
      {appModeObject.mode == 'Normal' && (
        <div className="text-gray-300 text-end text-xs">
          {createdDate.getHours() + ':' + createdDate.getMinutes()}
        </div>
      )}
    </div>
  );
}
