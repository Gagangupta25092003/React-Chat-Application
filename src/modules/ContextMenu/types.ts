export type ButtonWithModalTypes = {
  closeContextMenu: (event: MouseEvent) => void;
  contextMenuData: {
    x: number;
    y: number;
  };
  children: React.ReactNode;
};
