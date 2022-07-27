import { contextBridge, ipcRenderer } from 'electron'
import {
  FLATPAK_LIST_COMMAND,
  FLATPAK_RUN_COMMAND,
  GZDOOM_PATH,
  MOD_PATH,
  SETTINGS_CONTENTS,
  SETTINGS_FILE,
  SETTINGS_FILE_PATH
} from './constants';
const fs = require('fs');
const os = require('os');
const path = require('path');
const exec = require('await-exec');

export const api = {

  engineSearch: async () => {
    const response = await exec(FLATPAK_LIST_COMMAND)
    return !!response.stdout
  },

  writeSettings: async (settings: object) => {
    const settingsPath = path.join(os.homedir(), SETTINGS_FILE_PATH, SETTINGS_FILE);
    await fs.writeFileSync(settingsPath, JSON.stringify(settings));
  },

  initSettings: async () => {
    const settingsPath = path.join(os.homedir(), SETTINGS_FILE_PATH);
    const withFileName = path.join(settingsPath, SETTINGS_FILE)
    if (fs.existsSync(withFileName)) {
      return JSON.parse(fs.readFileSync(withFileName));
    }
    try {
      fs.mkdirSync(settingsPath);
    } catch (e) {
      console.log(e)
    }
    await fs.writeFileSync(withFileName, JSON.stringify(SETTINGS_CONTENTS));
    return SETTINGS_CONTENTS
  },

  fileSearch: async (extendedPath: string = ''): Promise<string[]> => {
    const shortPath = `${GZDOOM_PATH}${extendedPath}`
    const fullPackagePath = path.join(os.homedir(), shortPath)
    return await fs.promises.readdir(fullPackagePath);
  },

  startEngine: (modList: string[], iwad: string) => {
    const iwadFull = `${GZDOOM_PATH}/${iwad}`;
    const modPrefix = `${GZDOOM_PATH}${MOD_PATH}`
    const command = [FLATPAK_RUN_COMMAND, `-iwad ${iwadFull}`]
    modList.forEach((m => command.push(`-file ${path.join(modPrefix, m)}`)));
    exec(command.join(' '))
  },

  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)
