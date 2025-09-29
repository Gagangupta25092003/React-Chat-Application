import { MouseEvent, useCallback, useState } from 'react';

export const useHandleChatMessages = () => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuData, setContextMenuData] = useState({
    x: 0,
    y: 0,
    messageId: -1,
  });

  const handleOpenContextMenu = useCallback(
    (e: MouseEvent<HTMLDivElement>, messageId: number) => {
      setContextMenuData({
        x: e.clientX,
        y: e.clientY,
        messageId: messageId,
      });
      setIsContextMenuOpen(true);
    },
    []
  );

  const closeContextMenu = useCallback(() => {
    setIsContextMenuOpen(false);
  }, []);

  return {
    isContextMenuOpen,
    contextMenuData,
    handleOpenContextMenu,
    closeContextMenu,
  };
};
