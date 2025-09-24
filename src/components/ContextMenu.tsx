import { useEffect } from 'react';

const ContextMenu = ({
  closeContextMenu,
  contextMenuData,
  children,
}: {
  closeContextMenu: (event: MouseEvent) => void;
  contextMenuData: {
    x: number;
    y: number;
  };
  children: React.ReactNode;
}) => {
  useEffect(() => {
    // console.log('asdn');
    document.addEventListener('click', closeContextMenu);
    return () => {
      document.removeEventListener('click', closeContextMenu);
    };
  });
  return (
    <div
      className="absolute flex flex-col max-w-64 bg-poolGreen text-white rounded-md z-1"
      style={{ top: contextMenuData.y, left: contextMenuData.x }}
      id="ContextMenu"
    >
      {children}
    </div>
  );
};

export default ContextMenu;
