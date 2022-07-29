import { ReactElement, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import { Button, Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import IwadModal from '../IwadModal';
import Spinner from 'react-bootstrap/Spinner';

export const LaunchBar = (props: {
  iwads: string[];
  selectedIwad: string;
  setSelectedIwad: (i: string) => void;
  selectedMods: string[];
  getFocusableElements: (b: boolean, elem: string) => void;
}): ReactElement => {
  const [launchDisabled, setLaunchDisabled] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { iwads, setSelectedIwad, selectedMods, selectedIwad, getFocusableElements } = props;
  const { t } = useTranslation('common', { useSuspense: false });

  const startEngine = async () => {
    setLaunchDisabled(true);
    await window.Main.startEngine(selectedMods, selectedIwad);
    window.Main.writeSettings({
      previousRun: {
        iwad: selectedIwad,
        mods: selectedMods,
      },
      savedConfigs: [],
    });
    setLaunchDisabled(false);
  };

  useEffect(() => {
    getFocusableElements(showModal, 'iwad');
  }, [showModal]);

  return (
    <>
      <IwadModal
        showModal={showModal}
        setShowModal={setShowModal}
        setValue={setSelectedIwad}
        iwads={iwads}
        selectedIwad={selectedIwad}
      />
      <Row style={{ height: '10rem' }}>
        <Col>
          <Card style={{ height: '80%' }} className='transparent-item'>
            <Card.Header>
              {t('SELECTED_IWAD')}: {selectedIwad || t('NONE')}
            </Card.Header>
            <Card.Body>
              <Button
                data-inputcategory='left'
                className='custom-button'
                style={{ width: '100%', height: '100%' }}
                onClick={() => setShowModal(true)}
              >
                {t('SET_IWAD')}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Button
            data-inputcategory='launch'
            className='custom-button'
            disabled={launchDisabled}
            style={{ width: '100%', height: '80%', fontSize: '48px' }}
            onClick={() => startEngine()}
          >
            {launchDisabled ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              t('LAUNCH')
            )}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default LaunchBar;
