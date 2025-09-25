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
