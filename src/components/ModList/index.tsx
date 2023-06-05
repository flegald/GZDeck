import { ReactElement, useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { ModListProps } from './types';
import fileIcon from '../../assets/images/folder-icon.png';
import { ModFile } from '../../types';
import './mod-list.css';
import { FormCheck } from 'react-bootstrap';

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
        className="eternal-item"
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
    let isActive = selectedMods.map(f => f.name).includes(modFile.name);

    return (
      <ListGroup.Item
        className="eternal-item"
        data-inputcategory={inputCategory}
        action
        as="button"
        key={modFile.name}
        onClick={() => {
          // @ts-ignore
          onSelect && onSelect(modFile);
        }}
      >
        <FormCheck checked={isActive} label={modFile.name} />
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
    <Card
      className="glass-background"
      style={{ height: '100%', overflowY: 'scroll' }}
    >
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {currPath !== '/mods' && inputCategory === 'left' && (
            <ListGroup.Item
              // className="transparent-item"
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
