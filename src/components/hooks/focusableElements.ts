import { useEffect, useState } from 'react';

export const useGamepadInput = () => {
  const [focusedElem, setFocusedElem] = useState<any>(0);
  const [currFocusIdx, setCurrFocusIdx] = useState<number>(0);
  const [elemsModList, setElemsModList] = useState<any>();
  const [elemsModal, setElemsModal] = useState<any>();
  const [launchButton, setLaunchButton] = useState<any>();
  const [exitButton, setExitButton] = useState<any>();

  const getFocusableElements = (
    useModal: boolean = false,
    hardCodedElem: string | boolean = false
  ): void => {
    const modList = document.querySelectorAll('[data-inputcategory="left"]');
    const exitButton = document.querySelectorAll('[data-inputcategory="exit"]');
    const modal = useModal
      ? document.querySelectorAll('[data-inputcategory="modal"]')
      : [];
    const launchButton = document.querySelectorAll(
      '[data-inputcategory="launch"]'
    );
    setElemsModList(modList);
    setElemsModal(modal);
    setLaunchButton(launchButton && launchButton.length && launchButton[0]);
    setExitButton(exitButton && exitButton.length && exitButton[0]);
    if (hardCodedElem) {
      if (hardCodedElem === 'iwad') {
        setCurrFocusIdx(modList.length - 1);
        setFocusedElem(modList[modList.length - 1]);
      }
    }
  };

  const focusElement = () => {
    focusedElem && focusedElem.focus();
  };

  useEffect(() => {
    if (elemsModal && elemsModal.length) {
      setCurrFocusIdx(0);
    }
  }, [elemsModal]);

  const adjustCurrIdx = (requestedIdx: number) => {
    const elemPool =
      elemsModal && elemsModal.length ? elemsModal : elemsModList;
    let newIdx: number;
    if (requestedIdx < 0) {
      newIdx = currFocusIdx;
    } else if (requestedIdx < elemPool.length) {
      newIdx = requestedIdx;
    } else {
      newIdx = currFocusIdx;
    }
    setFocusedElem(elemPool[newIdx]);
    setCurrFocusIdx(newIdx);
  };

  const handleInput = (input: string) => {
    switch (input) {
      case 'DPadDown':
        adjustCurrIdx(currFocusIdx + 1);
        break;
      case 'DPadUp':
        if (
          (currFocusIdx - 1 < 0 || focusedElem === launchButton) &&
          !elemsModal.length
        ) {
          setFocusedElem(exitButton);
          setCurrFocusIdx(0);
        } else {
          adjustCurrIdx(currFocusIdx - 1);
        }
        break;
      case 'DPadRight':
        if (elemsModal.length) return;
        setCurrFocusIdx(elemsModList.length - 1);
        setFocusedElem(launchButton);
        break;
      case 'DPadLeft':
        if (elemsModal.length) return;
        if (focusedElem === launchButton) {
          setFocusedElem(elemsModList[currFocusIdx]);
        } else if (focusedElem === exitButton) {
          setCurrFocusIdx(0);
          setFocusedElem(elemsModList[0]);
        }
        break;
      case 'A':
        focusedElem && focusedElem.click();
    }
  };

  useEffect(() => {
    focusElement();
  }, [focusedElem]);

  return {
    elemsModList,
    getFocusableElements,
    handleInput,
  };
};

export default useGamepadInput;
