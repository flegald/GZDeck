import { ReactElement } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

export const AppHeader = (): ReactElement => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" tabIndex={-1}>
          <span style={{fontFamily: 'DooM'}}>GZDeck</span>
        </Navbar.Brand>
        <Nav>
          <Button
            data-inputcategory='exit'
            variant="outline-danger"
            onClick={() => window.close()}
          >
            Exit
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
