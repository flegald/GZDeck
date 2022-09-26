import { ModFile } from '../../types';

export interface SettingsInterface {
  previousRun: {
    iwad: string,
    mods: ModFile[]
  },
  savedConfigs: any[]
}
