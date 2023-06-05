import { ReactElement, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModList from '../../components/ModList';
import { LaunchBar } from '../../components/LaunchBar';
import Container from 'react-bootstrap/Container';
import { SettingsInterface } from './types';
import { useTranslation } from 'react-i18next';
import { ModFile } from '../../types';
import EternalItem from '../../components/EternalItem';

export const Launch = (props: {
  mods: ModFile[];
  currPath: string;
  iwads: string[];
  childFolders: string[];
  settings: SettingsInterface;
  getFocusableElements: () => void;
  updateCurrPath: (name: string, forward?: boolean) => void;
}): ReactElement => {
  const [selectedMods, setSelectedMods] = useState<ModFile[]>([]);
  const [selectedIwad, setSelectedIwad] = useState<string>('');
  const { t } = useTranslation('common', { useSuspense: false });
  const {
    mods,
    iwads,
    settings,
    getFocusableElements,
    childFolders,
    updateCurrPath,
    currPath,
  } = props;

  useEffect(() => {
    if (settings.previousRun.iwad) {
      setSelectedIwad(settings.previousRun.iwad);
    }
    if (settings.previousRun.mods) {
      setSelectedMods(settings.previousRun.mods);
    }
  }, [settings]);

  const updateSelectedMods = (chosenMod: ModFile): void => {
    const cleanedTitle = chosenMod.name.replace('[+] ', '').replace('[-] ', '');
    const names = selectedMods.map(f => f.name);
    names.includes(cleanedTitle)
      ? setSelectedMods(selectedMods.filter(m => m.name !== cleanedTitle))
      : setSelectedMods(selectedMods.concat([chosenMod]));
  };
  return (
    <Container style={{ height: '100%' }} className="application">
      <Row style={{ minHeight: '75%' }}>
        <Col style={{ height: '30rem' }}>
          <ModList
            currPath={currPath}
            updateCurrPath={updateCurrPath}
            childFolders={childFolders}
            getFocusableElements={getFocusableElements}
            selectedMods={selectedMods}
            inputCategory="left"
            onSelect={updateSelectedMods}
            mods={mods}
            title={t('AVAILABLE_MODS')}
          />
        </Col>
        <Col style={{ maxHeight: '30rem' }}>
          <ModList
            currPath={currPath}
            updateCurrPath={updateCurrPath}
            childFolders={childFolders}
            getFocusableElements={getFocusableElements}
            selectedMods={selectedMods}
            inputCategory="right"
            mods={selectedMods}
            title={t('ACTIVE_MODS')}
            onSelect={updateSelectedMods}
          />
        </Col>
      </Row>
      <LaunchBar
        iwads={iwads}
        selectedMods={selectedMods}
        selectedIwad={selectedIwad}
        setSelectedIwad={setSelectedIwad}
        getFocusableElements={getFocusableElements}
      />
    </Container>
  );
};

export default Launch;
