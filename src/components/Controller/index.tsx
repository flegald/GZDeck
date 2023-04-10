import { ReactElement, useEffect, useState } from 'react';
import Gamepad from 'react-gamepad';
import { ControllerProps } from '../hooks/types';
import { useAppState } from '../../Providers/AppState/AppState';

export const Controller = (props: ControllerProps): ReactElement => {
  const [gamepadList, setGamepadList] = useState<number[]>([])
  const [activeGamepadIndex, setActiveGamepadIndex] = useState<number>(0)
  const { handleInput } = props;
  const {appState} = useAppState();

  window.addEventListener("gamepadconnected", (e) => {
      setGamepadList(navigator.getGamepads().filter((gamepad) => {
        return !!gamepad
      }).map(g => g.index));
  });

  window.addEventListener("Gamepaf")


  useEffect(() => {
    console.log(gamepadList);
  }, [gamepadList])


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
      gamepadIndex={activeGamepadIndex}
      onButtonDown={b => buttonDownHandler(b)}
      children={<p/>}
    />
  );
};

export default Controller;
