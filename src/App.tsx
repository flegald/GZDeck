import { ThemeProvider } from 'react-bootstrap';
import { AppHeader } from './components/AppHeader';
import { Launch } from './screens/Launch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { filterAcceptedFileTypes } from './utils/fileUtils';
import { SettingsInterface } from './screens/Launch/types';

export function App() {
  const [iwads, setIwads] = useState<string[]>([]);
  const [mods, setMods] = useState<string[]>([]);
  const [settings, setSettings] = useState<SettingsInterface>();

  const iwadSearch = async (): Promise<void> => {
    const results = await window.Main.fileSearch();
    setIwads(filterAcceptedFileTypes(results));
  };

  const modSearch = async (): Promise<void> => {
    const results = await window.Main.fileSearch('/mods');
    setMods(results);
  };

  const fetchSettings = async () => {
    const results = await window.Main.initSettings();
    setSettings(results);
  };

  const initApp = async (): Promise<void> => {
    await fetchSettings();
    await iwadSearch();
    await modSearch();
  };

  useEffect(() => {
    initApp();
  }, []);

  return (
    <ThemeProvider>
      <AppHeader />
      {settings && <Launch mods={mods} iwads={iwads} settings={settings} />}
    </ThemeProvider>
  );
}
