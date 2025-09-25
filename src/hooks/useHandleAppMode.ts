import { useMemo, useState } from 'react';

export type APP_MODE = 'Normal' | 'Compact';

export function useHandleAppMode() {
  // console.log('App Rendered');
  const [appMode, setAppMode] = useState('Normal' as APP_MODE);
  function handleAppMode() {
    appMode == 'Normal' ? setAppMode('Compact') : setAppMode('Normal');
  }

  const memoizedAppModeObject = useMemo(() => {
    return { mode: appMode, switchMode: handleAppMode };
  }, [appMode, handleAppMode]);

  return { memoizedAppModeObject };
}
