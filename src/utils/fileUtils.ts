import { ACCEPTED_FILE_TYPES } from './constants';

export const filterAcceptedFileTypes = (fileList: string[]): string[] => {
  return fileList.filter(f =>
    // @ts-ignore
    ACCEPTED_FILE_TYPES.includes(f.split('.').pop().toLowerCase())
  );
}
