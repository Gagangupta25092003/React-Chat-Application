import { SelectedConversationPane } from './SelectedConversationPane';
import { CustomModal } from './CustomModal';
import { ListConversationsPane } from './ListConversationPane';
import { MODAL_PROPS_WITH_CLOSE } from './CustomModal/types';
import { APP_MODE, useHandleAppMode } from './hooks/useHandleAppMode';
import { AppModalContext, AppModeContext } from './contexts';
import { useHandleChats } from './hooks/useHandleChats';
import { useModal } from './hooks/useModal';

export const MODAL_PROPS_INITIAL_STATE: MODAL_PROPS_WITH_CLOSE = {
  onSuccess: () => {},
  onCancel: () => {},
  text: '',
  type: 'Alert',
  closeModal: () => {},
};

export type APP_MODE_CONTEXT_TYPE = {
  mode: APP_MODE;
  switchMode: () => void;
};

function App() {
  const { memoizedAppModeObject } = useHandleAppMode();
  const { listConversationProps, selectedConversationPaneProps } =
    useHandleChats();

  const { isModalOpen, modalProperties, root, appModalValues } = useModal();

  return (
    <AppModeContext.Provider value={memoizedAppModeObject}>
      <AppModalContext.Provider value={appModalValues}>
        <div className="flex h-screen" id="App">
          <ListConversationsPane {...listConversationProps} />
          {selectedConversationPaneProps.chat ? (
            <SelectedConversationPane {...selectedConversationPaneProps} />
          ) : (
            <div className="bg-darkFeather grow-1" />
          )}

          {isModalOpen && (root ? <CustomModal {...modalProperties} /> : null)}
        </div>
      </AppModalContext.Provider>
    </AppModeContext.Provider>
  );
}

export default App;
