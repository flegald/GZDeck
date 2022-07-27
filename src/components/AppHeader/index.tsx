import { ReactElement } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export const AppHeader = (): ReactElement => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" tabIndex={-1}>GZDeck</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
