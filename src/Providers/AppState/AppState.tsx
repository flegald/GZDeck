import { createContext, useState, ReactNode, useContext } from 'react';
import { defaultAppState } from './constants';
import { AppStateInterface } from './types';

export const AppContext = createContext({ ...defaultAppState });

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState<AppStateInterface>(defaultAppState);

  const value = {
    ...appState,
    setAppState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppState = (): AppStateInterface => {
    return useContext(AppContext)
}
