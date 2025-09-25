import { useMemo, useState } from 'react';
import { MODAL_PROPS_INITIAL_STATE } from '../App';
import { MODAL_PROPS_WITH_CLOSE } from '../CustomModal/types';
import { AppModalContextValueType } from '../contexts';

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProperties, setModalProperties] = useState(
    MODAL_PROPS_INITIAL_STATE as MODAL_PROPS_WITH_CLOSE
  );
  function closeModal() {
    setModalProperties(MODAL_PROPS_INITIAL_STATE);
    setIsModalOpen(false);
  }

  function handlePromptModalProps(
    onSuccessFunc: (input: string) => void,
    modalText: string,
    onCancelFunc?: () => void
  ) {
    setModalProperties({
      type: 'Prompt',
      text: modalText,
      onSuccess: onSuccessFunc,
      onCancel: onCancelFunc || (() => () => {}),
      closeModal: closeModal,
    });
  }

  function handleOtherModalProps(
    onSuccessFunc: () => void,
    modalText: string,
    modalType: 'Alert' | 'Confirm',
    onCancelFunc?: () => void
  ) {
    setModalProperties({
      type: modalType,
      text: modalText,
      onSuccess: onSuccessFunc,
      closeModal: closeModal,
      onCancel: onCancelFunc || (() => () => {}),
    });
  }
  const root = document.getElementById('App');
  const appModalValues = useMemo((): AppModalContextValueType => {
    return {
      handleOtherModalProps,
      handlePromptModalProps,
      openModal: () => {
        setIsModalOpen(true);
      },
    };
  }, []);

  return { isModalOpen, modalProperties, root, appModalValues };
}
