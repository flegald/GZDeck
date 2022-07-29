import { ReactElement } from 'react';
import Gamepad from 'react-gamepad';
import { ControllerProps } from '../hooks/types';

export const Controller = (props: ControllerProps): ReactElement => {
  const { handleInput } = props;
  const connected = (gamepadIndex: number) => {
    console.log(`Gamepad ${gamepadIndex} connected !`);
  };

  const buttonDownHandler = (buttonName: string) => {
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
