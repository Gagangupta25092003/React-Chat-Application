import { MouseEvent } from 'react';
export type CustomButtonType = 'Normal' | 'Green' | 'Cancel';

export type CustomButtonPropTypes = {
  onClickFunction: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: CustomButtonType;
  children: React.ReactNode;
};
