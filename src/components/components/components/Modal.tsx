import { MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import CustomModal, { MODAL_PROPS_TYPE } from './CustomModal';
import Button from './Button';

const Modal = ({
  modalPropObject,
  children,
}: {
  size: 'Normal' | 'Large';
  type: 'Cancel' | 'Success';
  modalPropObject: MODAL_PROPS_TYPE;
  children: React.ReactNode;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  function handleSetModal(value: boolean) {
    console.log(`Setting Modal Visibility to ${value}`);
    setModalOpen(value);
  }

  const newmodalPropObject: MODAL_PROPS_TYPE =
    modalPropObject.type === 'Prompt'
      ? {
          ...modalPropObject,
          onCancel: () => {
            handleSetModal(false);
            modalPropObject.onCancel();
          },
          onSuccess: (message: string) => {
            console.log('Calling Function');
            handleSetModal(false);
            modalPropObject.onSuccess(message);
          },
        }
      : {
          ...modalPropObject,
          onCancel: () => {
            handleSetModal(false);
            modalPropObject.onCancel();
          },
          onSuccess: () => {
            console.log('Calling Function');
            handleSetModal(false);
            modalPropObject.onSuccess();
          },
        };

  const root = document.getElementById('App');

  console.log(` Modal Visibility is ${isModalOpen} ${modalPropObject.type}`);

  return (
    <>
      {isModalOpen &&
        (root
          ? createPortal(<CustomModal {...newmodalPropObject} />, root)
          : null)}
    </>
  );
};

export default Modal;
