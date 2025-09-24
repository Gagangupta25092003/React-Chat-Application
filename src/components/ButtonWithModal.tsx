import { useContext, useState } from 'react';
import { AppModalContext } from '../App';
import CustomButton, { CustomButtonType } from './CustomButton';
import { MODAL_PROPS_TYPE } from '../CustomModal/CustomModal';

const ButtonWithModal = ({
  type = 'Normal',
  modalPropObject,
  children,
}: {
  size: 'Normal' | 'Large';
  type: CustomButtonType;
  modalPropObject: MODAL_PROPS_TYPE;
  children: React.ReactNode;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalPropHandler = useContext(AppModalContext);

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

  function handleOpenModal() {
    if (newmodalPropObject.type === 'Prompt') {
      modalPropHandler.handlePromptModalProps(
        newmodalPropObject.onSuccess,
        newmodalPropObject.text,
        newmodalPropObject.onCancel
      );
    } else {
      modalPropHandler.handleOtherModalProps(
        newmodalPropObject.onSuccess,
        newmodalPropObject.text,
        newmodalPropObject.type,
        newmodalPropObject.onCancel
      );
    }
    modalPropHandler.openModal();
  }

  console.log(` Modal Visibility is ${isModalOpen} ${modalPropObject.type}`);

  return (
    <>
      <CustomButton type={type} onClickFunction={handleOpenModal}>
        {children}
      </CustomButton>
    </>
  );
};

export default ButtonWithModal;
