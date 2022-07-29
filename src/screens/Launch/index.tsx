import { ReactElement, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModList from '../../components/ModList';
import { LaunchBar } from '../../components/LaunchBar';
import Container from 'react-bootstrap/Container';
import { SettingsInterface } from './types';
import { useTranslation } from 'react-i18next';

export const Launch = (props: {
  mods: string[];
  iwads: string[];
  settings: SettingsInterface;
  getFocusableElements: () => void;
}): ReactElement => {
  const [selectedMods, setSelectedMods] = useState<string[]>([]);
  const [selectedIwad, setSelectedIwad] = useState<string>('');
  const { t } = useTranslation('common', { useSuspense: false });
  const { mods, iwads, settings, getFocusableElements } = props;

  useEffect(() => {
    if (settings.previousRun.iwad) {
      setSelectedIwad(settings.previousRun.iwad);
    }
    if (settings.previousRun.mods) {
      setSelectedMods(settings.previousRun.mods);
    }
  }, [settings]);

  const updateSelectedMods = (chosenMod: string): void => {
    selectedMods.includes(chosenMod)
      ? setSelectedMods(selectedMods.filter(m => m !== chosenMod))
      : setSelectedMods(selectedMods.concat([chosenMod]));
  };
  return (
    <Container style={{ height: '100%' }} className="application">
      <Row style={{ minHeight: '75%' }}>
        <Col style={{ maxHeight: '35em', overflowY: 'scroll' }}>
          <ModList
            selectedMods={selectedMods}
            inputCategory='left'
            onSelect={updateSelectedMods}
            mods={mods}
            title={t('AVAILABLE_MODS')}
          />
        </Col>
        <Col style={{ maxHeight: '35em', overflowY: 'scroll' }}>
          <ModList
            selectedMods={selectedMods}
            inputCategory='right'
            mods={selectedMods}
            title={t('ACTIVE_MODS')}
            onSelect={updateSelectedMods}
          />
        </Col>
      </Row>
      <br />
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
