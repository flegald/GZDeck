import { ReactElement } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { ModListProps } from './types';
export const ModList = (props: ModListProps): ReactElement => {
  const { mods, title, onSelect } = props;
  return (
    <Card style={{minHeight: '100%'}}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {mods.map(f => (
            <ListGroup.Item
              action
              as="button"
              key={f}
              onClick={e => {
                // @ts-ignore
                onSelect && onSelect(e.target.innerText);
              }}
            >
              {f}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ModList;
