import { memo, useContext, useState } from 'react';
import { CustomButton } from '../CustomButton/CustomButton';
import { MODAL_PROPS_TYPE } from '../../CustomModal/types';
import { ButtonWithModalPropsTypes } from './types';
import { AppModalContext } from '../../contexts';
import { useHandleModalProps } from './hooks/useHandleModalProps';

export const ButtonWithModal = memo(
  ({
    type = 'Normal',
    modalPropObject,
    children,
  }: ButtonWithModalPropsTypes) => {
    const { handleOpenModal } = useHandleModalProps({ modalPropObject });
    // console.log(` Modal Visibility is ${isModalOpen} ${modalPropObject.type}`);

    return (
      <>
        <CustomButton type={type} onClickFunction={handleOpenModal}>
          {children}
        </CustomButton>
      </>
    );
  }
);
