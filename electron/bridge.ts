import { contextBridge, ipcRenderer } from 'electron';
import {
  FLATPAK_LIST_COMMAND,
  FLATPAK_RUN_COMMAND,
  GZDOOM_PATH,
  SETTINGS_CONTENTS,
  SETTINGS_FILE,
  SETTINGS_FILE_PATH,
} from './constants';
import { SettingsInterface } from '../src/screens/Launch/types';
import { checkSettings } from './utils/settingsCheck';
const fs = require('fs');
const os = require('os');
const path = require('path');
const exec = require('await-exec');

export const api = {
  engineSearch: async (): Promise<boolean> => {
    const response = await exec(FLATPAK_LIST_COMMAND);
    return !!response.stdout;
  },

  initFileStructure: (): void => {
    const shortPath = `${GZDOOM_PATH}/mods`;
    const fullPackagePath = path.join(os.homedir(), shortPath);
    if (!fs.existsSync(fullPackagePath)) {
      fs.mkdirSync(fullPackagePath, { recursive: true });
    }
  },

  writeSettings: async (settings: object): Promise<void> => {
    const settingsPath = path.join(
      os.homedir(),
      SETTINGS_FILE_PATH,
      SETTINGS_FILE
    );
    await fs.writeFileSync(settingsPath, JSON.stringify(settings));
  },

  initSettings: (): SettingsInterface => {
    const settingsPath = path.join(os.homedir(), SETTINGS_FILE_PATH);
    const withFileName = path.join(settingsPath, SETTINGS_FILE);
    if (fs.existsSync(withFileName)) {
      const fileData = JSON.parse(fs.readFileSync(withFileName));
      if (checkSettings(fileData)) {
        return fileData;
      } else {
        fs.writeFileSync(withFileName, JSON.stringify(SETTINGS_CONTENTS));
      }
    }
    try {
      fs.mkdirSync(settingsPath);
    } catch (e) {
      console.log(e);
    }
    fs.writeFileSync(withFileName, JSON.stringify(SETTINGS_CONTENTS));
    return SETTINGS_CONTENTS;
  },

  fileSearch: async (extendedPath: string = ''): Promise<string[]> => {
    const shortPath = `${GZDOOM_PATH}${extendedPath}`;
    const fullPackagePath = path.join(os.homedir(), shortPath);
    return await fs.promises.readdir(fullPackagePath);
  },

  folderSearch: async (basePath: string): Promise<string[]> => {
    const shortPath = `${GZDOOM_PATH}${basePath}`;
    const fullPackagePath = path.join(os.homedir(), shortPath);
    return (await fs.promises.readdir(fullPackagePath, { withFileTypes: true }))
      .filter((dirent: any) => dirent.isDirectory())
      .map((dirent: any) => dirent.name);
  },

  startEngine: async (modList: string[], iwad: string): Promise<void> => {
    const iwadFull = `${GZDOOM_PATH}/${iwad}`;
    const modPrefix = `${GZDOOM_PATH}`;
    const command = [FLATPAK_RUN_COMMAND, `-iwad ${iwadFull}`];
    modList.forEach(m => command.push(`-file "${path.join(modPrefix, m)}"`));
    await exec(command.join(' '));
  },

  on: (channel: string, callback: Function): void => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld('Main', api);
