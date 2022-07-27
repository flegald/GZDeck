export interface ModListProps {
  title: string;
  mods: string[];
  onSelect?:(m: string) => void;
}
