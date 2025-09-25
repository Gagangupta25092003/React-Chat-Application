import { MouseEvent } from 'react';
import { CustomButtonPropTypes, CustomButtonType } from './types';

export const CustomButton = ({
  type = 'Normal',
  onClickFunction,
  children,
}: CustomButtonPropTypes) => {
  function getButtonColor() {
    switch (type) {
      case 'Normal':
        return 'bg-freinachtBlack hover:bg-darkFeather';
      case 'Green':
        return 'bg-poolGreen hover:bg-malachite';
      case 'Cancel':
        return 'bg-red-500 hover:bg-red-700';
      default:
        throw new Error('Wrong Prop Value in Button Component!');
    }
  }

  const buttonColorTag = getButtonColor();

  return (
    <button
      className={`${buttonColorTag} text-white text-sm rounded-md flex gap-x-4  py-2 px-4 items-center`}
      onClick={(e) => {
        e.stopPropagation();
        onClickFunction(e);
      }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
