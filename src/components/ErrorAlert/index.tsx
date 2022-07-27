import { ReactElement } from 'react';
import { Alert } from 'react-bootstrap';

export const ErrorAlert = (props: {
  errorTitle: string;
  errorBody: string;
}): ReactElement => {
  const { errorTitle, errorBody } = props;
  return (
    <Alert variant="danger">
      <h2>{errorTitle}</h2>
      <p>{errorBody}</p>
    </Alert>
  );
};

export default ErrorAlert;
