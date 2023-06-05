import { ReactElement } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

export const ErrorAlert = (props: {
  errorTitle: string;
  errorBody: string;
  showExit?: boolean;
}): ReactElement => {
  const { errorTitle, errorBody, showExit } = props;
  const { t } = useTranslation('common', { useSuspense: false });

  return (
    <Alert variant="danger">
      <h2>{errorTitle}</h2>
      <p>{errorBody}</p>
      {showExit && (
        <Button
          style={{ marginLeft: '40%' }}
          data-inputcategory="exit"
          variant="outline-danger"
          onClick={() => window.close()}
        >
          {t('EXIT')}
        </Button>
      )}
    </Alert>
  );
};

export default ErrorAlert;
