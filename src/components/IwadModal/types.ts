export interface IwadModalProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  setValue: (val: string) => void;
  iwads: string[];
  selectedIwad: string;
}
