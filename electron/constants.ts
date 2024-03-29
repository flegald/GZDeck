export const GZDOOM_PATH = '.var/app/org.zdoom.GZDoom/.config/gzdoom';
export const MOD_PATH = '/mods';
export const FLATPAK_RUN_COMMAND = 'flatpak run org.zdoom.GZDoom';
export const FLATPAK_LIST_COMMAND = 'flatpak list | grep GZDoom';

export const SETTINGS_FILE_PATH = '.config/GZDeck';
export const SETTINGS_FILE = 'settings.json';
export const SETTINGS_CONTENTS = {
  previousRun: {
    iwad: '',
    mods: []
  },
  savedConfigs: []
}
