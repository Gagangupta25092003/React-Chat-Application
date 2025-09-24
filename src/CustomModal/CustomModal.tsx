import { KeyboardEvent, MouseEvent, useState } from 'react';
import CustomButton from '../components/CustomButton';

type ConfirmOrAlertProps = {
  type: 'Confirm' | 'Alert';
  text: string;
  onSuccess: () => void;
  onCancel: () => void;
};

type PromptProps = {
  type: 'Prompt';
  text: string;
  onSuccess: (message: string) => void;
  onCancel: () => void;
};

export type MODAL_PROPS_TYPE = ConfirmOrAlertProps | PromptProps;

export type MODAL_PROPS_WITH_CLOSE = MODAL_PROPS_TYPE & {
  closeModal: () => void;
};

export const CustomModal = ({
  type,
  text,
  onSuccess,
  onCancel,
  closeModal,
}: MODAL_PROPS_WITH_CLOSE) => {
  const [inputText, setInputText] = useState('');

  let handleInputText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputText(e.target.value);
  };

  const customOnSuccess = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent
  ) => {
    e.stopPropagation();
    if (type === 'Prompt') {
      //   console.log('Running onSuccess');

      onSuccess(inputText);
    } else {
      onSuccess();
    }
    closeModal();
  };
  const customOnCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel();
    closeModal();
    console.log('Closing Modal');
  };

  const modalText = <h2>{text}</h2>;
  const cancelButton = (
    <CustomButton onClickFunction={customOnCancel} type="Cancel">
      <p>Cancel</p>{' '}
    </CustomButton>
  );
  const successButton = (
    <CustomButton onClickFunction={customOnSuccess} type={'Green'}>
      <p>{type === 'Confirm' ? 'Confirm' : 'Ok'}</p>{' '}
    </CustomButton>
  );
  function getInsideLayout() {
    switch (type) {
      case 'Confirm':
        return (
          <div className="flex flex-col justify-between p-4 bg-greyChateau rounded-xl min-h-28 min-w-64 text-white">
            {modalText}
            <div className="flex justify-between">
              {cancelButton}
              {successButton}
            </div>
          </div>
        );
      case 'Alert':
        return (
          <div className="flex flex-col justify-between p-4 bg-greyChateau rounded-xl min-h-28 min-w-64 text-white">
            {modalText}
            <div className="flex justify-between">{successButton}</div>
          </div>
        );
      case 'Prompt':
        return (
          <div className="flex flex-col justify-between p-4 gap-y-4 border-greyChateau border-1 bg-freinachtBlack rounded-xl min-h-28 min-w-72 text-white">
            {modalText}
            <input
              className="bg-greyChateau text-white text-sm p-2 rounded-md "
              value={inputText}
              onChange={handleInputText}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  customOnSuccess(e);
                }
              }}
            />
            <div className="flex justify-between">
              {cancelButton}
              {successButton}
            </div>
          </div>
        );
      default:
        return <></>;
    }
  }
  return (
    <div className="absolute w-full h-full flex justify-center items-center ">
      {getInsideLayout()}
    </div>
  );
};
