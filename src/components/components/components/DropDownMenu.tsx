import { ReactNode, useEffect } from 'react';

const DropDownMenu = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    function handleClick() {}
  });
  return <div className="absolute top-0 left-0">{children}</div>;
};
