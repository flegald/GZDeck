export interface ModListProps {
  title: string;
  mods: string[];
  selectedMods: string[];
  onSelect?:(m: string) => void;
  inputCategory: string;
  getFocusableElements: () => void;
}
