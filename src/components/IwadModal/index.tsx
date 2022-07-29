import { ReactElement } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Card, ListGroup } from 'react-bootstrap';
import { IwadModalProps } from './types';

export const IwadModal = (props: IwadModalProps): ReactElement => {
  const {
    showModal,
    setShowModal,
    setValue,
    iwads,
    selectedIwad,
  } = props;
  const { t } = useTranslation('common', { useSuspense: false });

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>{t('AVAILABLE_IWADS')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <ListGroup>
            {iwads.map(i => (
              <ListGroup.Item
                className='modal-list-item'
                data-inputcategory="modal"
                active={i === selectedIwad}
                onClick={() => setValue(i)}
                action
              >
                {i}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button
          data-inputcategory="modal"
          className="custom-button"
          variant="primary"
          onClick={() => setShowModal(false)}
        >
          {t('OK')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IwadModal;
