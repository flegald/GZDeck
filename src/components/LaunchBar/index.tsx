import { ReactElement } from 'react';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export const LaunchBar = (props: {
  iwads: string[];
  selectedIwad: string;
  setSelectedIwad: (i: string) => void;
  selectedMods: string[];
}): ReactElement => {
  const { iwads, setSelectedIwad, selectedMods, selectedIwad } = props;

  const startEngine = () => {
    window.Main.startEngine(selectedMods, selectedIwad);
    window.Main.writeSettings({
      previousRun: {
        iwad: selectedIwad,
        mods: selectedMods
      },
      savedConfigs: []
    })
  };

  return (
    <Row>
      <Col>
        <Form.Select
          aria-label="Select IWAD"
          value={selectedIwad}
          onChange={e => setSelectedIwad(e.target.value)}
        >
          <option>Select IWAD</option>
          {iwads.map(i => (
            <option value={i}>{i}</option>
          ))}
        </Form.Select>
      </Col>

      <Col>
        <Button style={{ width: '100%' }} onClick={() => startEngine()}>
          Launch
        </Button>
      </Col>
    </Row>
  );
};

export default LaunchBar;
