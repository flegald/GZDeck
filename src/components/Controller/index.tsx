import { ReactElement } from 'react';
import Gamepad from 'react-gamepad';
import { ControllerProps } from '../hooks/types';
import { useAppState } from '../../Providers/AppState/AppState';

export const Controller = (props: ControllerProps): ReactElement => {
  const { handleInput } = props;
  const {appState} = useAppState();
  const connected = (gamepadIndex: number) => {
    console.log(`Gamepad ${gamepadIndex} connected !`);
  };

  const buttonDownHandler = (buttonName: string) => {
    if (appState.inputDisabled) return;
    handleInput(buttonName);
  };

  return (
    <Gamepad
      onConnect={e => connected(e)}
      onButtonDown={b => buttonDownHandler(b)}
      children={<p/>}
    />
  );
};

export default Controller;