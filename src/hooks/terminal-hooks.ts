import { useEffect } from 'react';

export const useScrollToBottom = (
  ref: React.RefObject<HTMLDivElement>,
  dep: any,
) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
};

export const useResetCurrentOutput = (
  userPrompts: { input: string; output: string }[],
  setCurrentOutput: React.Dispatch<React.SetStateAction<string>>,
) => {
  useEffect(() => {
    if (userPrompts.length === 0) {
      return () => {};
    }
    setCurrentOutput('');
  }, [userPrompts]);
};

export const useUpdateOutputAndUserTyping = (
  userPrompts: { input: string; output: string }[],
  delay: number,
  setUserCanType: React.Dispatch<React.SetStateAction<boolean>>,
  outputIndex: number,
  setOutputIndex: React.Dispatch<React.SetStateAction<number>>,
  setCurrentOutput: React.Dispatch<React.SetStateAction<string>>,
) => {
  useEffect(() => {
    const currentCommandIndex = userPrompts.length - 1;
    if (currentCommandIndex === -1 || userPrompts.length === 0) {
      setUserCanType(true);
      return () => {};
    }

    let timer: number;
    if (delay == 0) {
      setCurrentOutput(userPrompts[currentCommandIndex].output);
    } else {
      timer = setTimeout(
        () => {
          if (userPrompts[currentCommandIndex]) {
            setCurrentOutput(
              userPrompts[currentCommandIndex].output.slice(0, outputIndex),
            );

            if (outputIndex < userPrompts[currentCommandIndex].output.length) {
              setOutputIndex(outputIndex + 1);
            }
          }
        },
        delay,
        [],
      );
    }

    if (
      userPrompts.length > 0 &&
      userPrompts[currentCommandIndex] &&
      outputIndex === userPrompts[currentCommandIndex].output.length
    ) {
      setUserCanType(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [outputIndex, userPrompts]);
};

export const useSpin = (
  setSpin: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    useEffect(() => {
    const spinTerminalHandler = () => {
      setSpin(true);
      setTimeout(() => setSpin(false), 1000); 
    };
    window.addEventListener('spinTerminal', spinTerminalHandler);

    return () =>
      window.removeEventListener('spinTerminal', spinTerminalHandler);
  }, [])
}

export const useResetSpin = (
  terminalRef:React.RefObject<HTMLDivElement> ,
  setSpin: React.Dispatch<React.SetStateAction<boolean>>,
  spin: boolean,
) => {
  useEffect(() => {
    const terminalElement = terminalRef.current;

    if (terminalElement && spin) {
      const onAnimationEnd = () => setSpin(false);
      terminalElement.addEventListener('animationend', onAnimationEnd);
      return () =>
        terminalElement.removeEventListener('animationend', onAnimationEnd);
    }
  }, [spin]);
}