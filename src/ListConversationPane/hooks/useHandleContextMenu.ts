import { MouseEvent, useCallback, useState } from 'react';

export const useHandleContextMenu = () => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const [contextMenuData, setContextMenuData] = useState({
    x: 0,
    y: 0,
    chatId: -1,
  });

  const handleOpenContextMenu = useCallback(
    (e: MouseEvent<HTMLButtonElement>, chatId: number) => {
      setContextMenuData({
        x: e.clientX,
        y: e.clientY,
        chatId: chatId,
      });
      setIsContextMenuOpen(true);
    },
    []
  );

  const handleCloseContextMenu = useCallback(() => {
    setIsContextMenuOpen(false);
  }, []);
  return {
    isContextMenuOpen,
    contextMenuData,
    handleOpenContextMenu,
    handleCloseContextMenu,
  };
};
