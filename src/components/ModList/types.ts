import { ModFile } from '../../types';

export interface ModListProps {
  childFolders: string[];
  title: string;
  mods: ModFile[];
  selectedMods: ModFile[];
  onSelect?:(m: ModFile) => void;
  inputCategory: string;
  getFocusableElements: () => void;
  updateCurrPath: (name: string, forward?: boolean) => void;
  currPath: string;
}
