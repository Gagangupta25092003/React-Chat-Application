import { MouseEvent, useCallback, useState } from 'react';

export const useHandleContextMenu = () => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuData, setContextMenuData] = useState({
    x: 0,
    y: 0,
  });
  const handleOpenContextMenu = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      //   console.log('Opening Context Menu');
      setContextMenuData({
        x: e.clientX,
        y: e.clientY,
      });
      setIsContextMenuOpen(true);
      e.stopPropagation();
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
