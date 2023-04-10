import { ReactElement, useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { ModListProps } from './types';
import fileIcon from '../../assets/images/folder-icon.png';
import { ModFile } from '../../types';

export const ModList = (props: ModListProps): ReactElement => {
  const [titleList, setTitleList] = useState<ReactElement[]>([]);
  const [folderList, setFolderList] = useState<ReactElement[]>([]);
  const {
    mods,
    title,
    onSelect,
    inputCategory,
    selectedMods,
    getFocusableElements,
    childFolders,
    updateCurrPath,
    currPath,
  } = props;

  const generateFolderText = (name: string): ReactElement => {
    return (
      <ListGroup.Item
        className="transparent-item"
        data-inputcategory={inputCategory}
        action
        as="button"
        key={title}
        onClick={() => {
          updateCurrPath(name);
        }}
      >
        <img src={fileIcon} width={'20px'} alt="folder" /> {name}
      </ListGroup.Item>
    );
  };

  const generateRowText = (modFile: ModFile): ReactElement => {
    let rowText: string | ReactElement = modFile.name;
    let isActive = false;
    if (inputCategory === 'left') {
      isActive = selectedMods.map(f => f.name).includes(modFile.name);
      const prefix = isActive ? (
        <span className="remove-icon">[-]</span>
      ) : (
        <span className="add-icon">[+]</span>
      );
      rowText = (
        <span>
          {prefix} {modFile.name}
        </span>
      );
    }

    return (
      <ListGroup.Item
        className="transparent-item"
        data-inputcategory={inputCategory}
        action
        as="button"
        key={modFile.name}
        onClick={() => {
          // @ts-ignore
          onSelect && onSelect(modFile);
        }}
      >
        {rowText}
      </ListGroup.Item>
    );
  };

  useEffect(() => {
    setTitleList(mods.map(m => generateRowText(m)));
    setFolderList(childFolders.map(f => generateFolderText(f)));
  }, []);

  useEffect(() => {
    setTitleList(mods.map(m => generateRowText(m)));
    setFolderList(childFolders.map(f => generateFolderText(f)));
  }, [mods, selectedMods, childFolders]);

  useEffect(() => {
    getFocusableElements();
  }, [titleList, childFolders]);

  return (
    <Card className="transparent-item" style={{height: '100%', overflowY: 'scroll'}}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <ListGroup variant="flush" className="transparent-item">
          {currPath !== '/mods' && inputCategory === 'left' && (
            <ListGroup.Item
              className="transparent-item"
              data-inputcategory={inputCategory}
              action
              as="button"
              key={title}
              onClick={() => {
                updateCurrPath('', false);
              }}
            >
              <img src={fileIcon} width={'20px'} alt="folder" /> ...
            </ListGroup.Item>
          )}
          {inputCategory === 'left' && folderList.map(f => f)}
          {titleList.map(f => f)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ModList;
