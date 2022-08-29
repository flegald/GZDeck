import { ReactElement, useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { ModListProps } from './types';

export const ModList = (props: ModListProps): ReactElement => {
  const [titleList, setTitleList] = useState<ReactElement[]>([]);
  const {
    mods,
    title,
    onSelect,
    inputCategory,
    selectedMods,
    getFocusableElements,
  } = props;

  const generateRowText = (title: string): ReactElement => {
    let rowText: string | ReactElement = title;
    let isActive = false;
    if (inputCategory === 'left') {
      isActive = selectedMods.includes(title);
      const prefix = isActive ? (
        <span className="remove-icon">[-]</span>
      ) : (
        <span className="add-icon">[+]</span>
      );
      rowText = (
        <span>
          {prefix} {title}
        </span>
      );
    }

    return (
      <ListGroup.Item
        className="transparent-item"
        data-inputcategory={inputCategory}
        action
        as="button"
        key={title}
        onClick={e => {
          // @ts-ignore
          onSelect && onSelect(e.target.innerText);
        }}
      >
        {rowText}
      </ListGroup.Item>
    );
  };

  useEffect(() => {
    setTitleList(mods.map(m => generateRowText(m)));
  }, []);

  useEffect(() => {
    setTitleList(mods.map(m => generateRowText(m)));
  }, [mods, selectedMods]);

  useEffect(() => {
    getFocusableElements();
  }, [titleList]);

  return (
    <Card style={{ minHeight: '100%' }} className="transparent-item">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <ListGroup variant="flush" className="transparent-item">
          {titleList.map(f => f)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ModList;
