import { useCallback, useContext, useMemo, useState } from 'react';
import { MODAL_PROPS_TYPE } from '../../../CustomModal/types';
import { AppModalContext } from '../../../contexts';

export const useHandleModalProps = ({
  modalPropObject,
}: {
  modalPropObject: MODAL_PROPS_TYPE;
}) => {
  //   const [isModalOpen, setModalOpen] = useState(false);

  //   function handleSetModal(value: boolean) {
  //     // console.log(`Setting Modal Visibility to ${value}`);
  //     setModalOpen(value);
  //   }
  const modalPropHandler = useContext(AppModalContext);

  const newmodalPropObject: MODAL_PROPS_TYPE = useMemo(
    () =>
      modalPropObject.type === 'Prompt'
        ? {
            ...modalPropObject,
            onCancel: () => {
              //   handleSetModal(false);
              modalPropObject.onCancel();
            },
            onSuccess: (message: string) => {
              console.log('Calling Function');
              //   handleSetModal(false);
              modalPropObject.onSuccess(message);
            },
          }
        : {
            ...modalPropObject,
            onCancel: () => {
              //   handleSetModal(false);
              modalPropObject.onCancel();
            },
            onSuccess: () => {
              console.log('Calling Function');
              //   handleSetModal(false);
              modalPropObject.onSuccess();
            },
          },
    [modalPropObject]
  );

  const handleOpenModal = useCallback(function () {
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
  }, []);

  return { handleOpenModal };
};
