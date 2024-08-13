import { Spinner } from 'react-bootstrap';
import { AppHeader } from './components/AppHeader';
import { Launch } from './screens/Launch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { filterAcceptedFileTypes } from './utils/fileUtils';
import { SettingsInterface } from './screens/Launch/types';
import ErrorAlert from './components/ErrorAlert';
import { useTranslation } from 'react-i18next';
import LoadingOverlay from 'react-loading-overlay-ts';
import './index.css';
import './i18n';
import Container from 'react-bootstrap/Container';
import Controller from './components/Controller';
import useGamepadInput from './components/hooks/focusableElements';
import { AppStateProvider } from './Providers/AppState/AppState';
import { ModFile } from './types';

export function App() {
  const [currPath, setCurrPath] = useState<string>('/mods');
  const [iwads, setIwads] = useState<string[]>([]);
  const [mods, setMods] = useState<ModFile[]>([]);
  const [childFolders, setChildFolders] = useState<string[]>([]);
  const [settings, setSettings] = useState<SettingsInterface>();
  const [engineInstalled, setEngineInstalled] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { t, ready } = useTranslation('common', { useSuspense: false });
  const { getFocusableElements, handleInput } = useGamepadInput();

  const initFileStructure = () => {
    window.Main.initFileStructure();
  };

  const engineSearch = async (): Promise<void> => {
    try {
      setEngineInstalled(await window.Main.engineSearch());
    } catch (error) {
      setEngineInstalled(false);
    }
  };

  const iwadSearch = async (): Promise<void> => {
    const results = await window.Main.fileSearch();
    setIwads(filterAcceptedFileTypes(results));
  };

  const modSearch = async (): Promise<void> => {
    const results = await window.Main.fileSearch(currPath);
    const acceptsMods = filterAcceptedFileTypes(results);
    setMods(
      results
        .filter(f => acceptsMods.includes(f))
        .map(f => ({ name: f, path: `${currPath}/${f}` }))
    );
  };

  const childFolderSearch = async (): Promise<void> => {
    const results = await window.Main.folderSearch(currPath);
    setChildFolders(results);
  };


  const fetchSettings = async () => {
    const results = await window.Main.initSettings();
    setSettings(results);
  };

  const updateContents = async () => {
    await modSearch();
    await childFolderSearch();
  };

  const updateCurrPath = (name: string, forward = true) => {
    const newPath = forward
      ? `${currPath}/${name}`
      : currPath.split('/').slice(0, -1).join('/');
    setCurrPath(newPath);
  };

  const initApp = async (): Promise<void> => {
    setIsInitialized(false);
    initFileStructure();
    await engineSearch();
    await fetchSettings();
    await iwadSearch();
    await updateContents();
    getFocusableElements();
    setIsInitialized(true);
  };

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    updateContents();
  }, [currPath]);

  return (
    <AppStateProvider>
      <Container>
        <Controller handleInput={handleInput} />
        <AppHeader />
        <LoadingOverlay
          active={!isInitialized || !ready}
          styles={{ wrapper: { height: '93%' } }}
          spinner={<Spinner animation="border" />}
        >
          {!engineInstalled && isInitialized && (
            <ErrorAlert
              errorTitle={t('GZDOOM_NOT_FOUND')}
              errorBody={t('INSTALL_GZDOOM')}
            />
          )}
          {settings && engineInstalled && (
            <Launch
              currPath={currPath}
              updateCurrPath={updateCurrPath}
              childFolders={childFolders}
              mods={mods}
              iwads={iwads}
              settings={settings}
              getFocusableElements={getFocusableElements}
            />
          )}
        </LoadingOverlay>
      </Container>
    </AppStateProvider>
  );
}
