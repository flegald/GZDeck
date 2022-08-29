import {AppStateInterface} from "./types";

export const defaultAppState: AppStateInterface = {
    setAppState: (state: AppStateInterface): void => {},
    appState: {
        inputDisabled: false
    }
}
