import { MODAL_PROPS_TYPE } from '../../CustomModal/types';
import { CustomButtonType } from '../CustomButton/types';

export type ButtonWithModalPropsTypes = {
  size: 'Normal' | 'Large';
  type: CustomButtonType;
  modalPropObject: MODAL_PROPS_TYPE;
  children: React.ReactNode;
};
