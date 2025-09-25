import { createContext } from 'react';
import { APP_MODE_CONTEXT_TYPE } from './App';

export const AppModeContext = createContext({
  mode: 'Normal',
  switchMode: () => {},
} as APP_MODE_CONTEXT_TYPE);

export type AppModalContextValueType = {
  handlePromptModalProps: (
    onSuccessFunc: (input: string) => void,
    modalText: string,
    onCancelFunc?: () => void
  ) => void;
  handleOtherModalProps: (
    onSuccessFunc: () => void,
    modalText: string,
    modalType: 'Alert' | 'Confirm',
    onCancelFunc?: () => void
  ) => void;
  openModal: () => void;
};

export const AppModalContext = createContext({
  handlePromptModalProps: (
    onSuccessFunc: (input: string) => void,
    modalText: string,
    onCancelFunc?: () => void
  ) => {},
  handleOtherModalProps: (
    onSuccessFunc: () => void,
    modalText: string,
    modalType: 'Alert' | 'Confirm',
    onCancelFunc?: () => void
  ) => {},
  openModal: () => {},
});
