export interface AppStateInterface {
    setAppState(state: AppStateInterface): void,
    appState: {
        inputDisabled: boolean
    }
}
