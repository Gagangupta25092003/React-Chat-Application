import { MouseEvent } from 'react';

const Button = ({
  size = 'Normal',
  type = 'Success',
  onClickFunction,
  children,
}: {
  onClickFunction: (e: MouseEvent<HTMLButtonElement>) => void;
  size: 'Normal' | 'Large';
  type: 'Cancel' | 'Success';
  children: React.ReactNode;
}) => {
  function getButtonSize() {
    switch (size) {
      case 'Normal':
        return 'max-w-36';
      case 'Large':
        return 'max-w-36';
      default:
        throw new Error('Wrong Prop Value in Button Component!');
    }
  }

  function getButtonColor() {
    switch (type) {
      case 'Cancel':
        return 'bg-red-500 hover:bg-red-700';
      case 'Success':
        return 'bg-poolGreen hover:bg-malachite';
      default:
        throw new Error('Wrong Prop Value in Button Component!');
    }
  }

  const buttonSizeTag = getButtonSize();
  const buttonColorTag = getButtonColor();
  const root = document.getElementById('App');

  // console.log(buttonColorTag);
  // console.log(buttonSizeTag);
  return (
    <button
      className={`${buttonSizeTag} ${buttonColorTag} text-white text-sm rounded-md`}
      onClick={(e) => {
        e.stopPropagation();
        onClickFunction(e);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
