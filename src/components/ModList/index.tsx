import { ReactElement } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { ModListProps } from './types';
export const ModList = (props: ModListProps): ReactElement => {
  const { mods, title, onSelect, inputCategory, selectedMods } = props;
  return (
    <Card style={{minHeight: '100%'}} className='transparent-item'>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <ListGroup variant="flush" className='transparent-item'>
          {mods.map(f => (
            <ListGroup.Item
              className='transparent-item'
              data-inputcategory={inputCategory}
              action
              active={inputCategory === 'left' && selectedMods.includes(f)}
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
