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
}): ReactElement => {
  const [selectedMods, setSelectedMods] = useState<string[]>([]);
  const [selectedIwad, setSelectedIwad] = useState<string>('');
  const { t, ready } = useTranslation('common', { useSuspense: false });
  const { mods, iwads, settings } = props;

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
    <Container style={{ height: '100%' }}>
      <Row style={{ minHeight: '75%' }}>
        <Col>
          <ModList
            onSelect={updateSelectedMods}
            mods={mods}
            title={t('ACTIVE_MODS')}
          />
        </Col>
        <Col>
          <ModList
            mods={selectedMods}
            title={t("ACTIVE_MODS")}
            onSelect={updateSelectedMods}
          />
        </Col>
      </Row>

      <LaunchBar
        iwads={iwads}
        selectedMods={selectedMods}
        selectedIwad={selectedIwad}
        setSelectedIwad={setSelectedIwad}
      />
    </Container>
  );
};

export default Launch;
