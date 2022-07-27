import { ReactElement } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Badge } from 'react-bootstrap';

export const AppHeader = (props: { error?: string }): ReactElement => {
  const { error } = props;
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" tabIndex={-1}>Doom Deck</Navbar.Brand>
        {error && (
          <Nav.Item>
            <Badge bg="danger">No IWADS Found</Badge>
          </Nav.Item>
        )}
      </Container>
    </Navbar>
  );
};

export default AppHeader;
