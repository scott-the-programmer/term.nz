import React, { useRef, useEffect, useState } from 'react';
import './Terminal.css';

interface TerminalProps {
  userPrompts: { input: string; output: string }[];
  onCommand: (input: string) => void;
  delay: number;
}

const getBrowserName = () => {
  const userAgent = window.navigator.userAgent;
  let browserName = 'unknown';
  const browserList = [
    { name: 'Chrome', value: 'Chrome' },
    { name: 'Firefox', value: 'Firefox' },
    { name: 'Safari', value: 'Safari' },
    { name: 'Opera', value: 'OPR' },
    { name: 'Edge', value: 'Edg' },
    { name: 'Internet Explorer', value: 'Trident' },
  ];

  for (let browser of browserList) {
    if (userAgent.includes(browser.value)) {
      browserName = browser.name;
      break;
    }
  }

  return browserName;
};

// Custom hook to handle scrolling
const useScrollToBottom = (ref: React.RefObject<HTMLDivElement>, dep: any) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
};

// Custom hook to handle resetting current output
const useResetCurrentOutput = (
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

// Custom hook to handle updating the output and user typing
const useUpdateOutputAndUserTyping = (
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

const Terminal: React.FC<TerminalProps> = ({
  userPrompts,
  onCommand,
  delay = 5,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [outputIndex, setOutputIndex] = useState(0);
  const [currentOutput, setCurrentOutput] = useState('');
  const [userCanType, setUserCanType] = useState(true);

  useScrollToBottom(terminalRef, currentOutput);
  useResetCurrentOutput(userPrompts, setCurrentOutput);
  useUpdateOutputAndUserTyping(
    userPrompts,
    delay,
    setUserCanType,
    outputIndex,
    setOutputIndex,
    setCurrentOutput,
  );

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = event.currentTarget.value.trim();
      setUserCanType(false);
      setOutputIndex(0);
      setCurrentOutput('');
      if (input) {
        onCommand(input);
      } else {
        onCommand('');
      }
      event.currentTarget.value = '';
    }
  };

  const user = getBrowserName() + '@scott-term:~$';
  return (
    <div className="terminal">
      <span className="terminal-tab">
        <span style={{ color: '#ebdbb2' }}>scott-term</span>
      </span>
      <div className="terminal-body" ref={terminalRef}>
        {userPrompts.map((prompt, index) => {
          const isCurrentCommand = index === userPrompts.length - 1;
          let output = isCurrentCommand ? currentOutput : prompt.output;
          return (
            <React.Fragment key={index}>
              <span style={{ color: '#8ec07c' }}>{user}</span> {prompt.input}
              <br />
              {output}
              <br />
            </React.Fragment>
          );
        })}
        {userCanType && (
          <React.Fragment>
            <span style={{ color: '#8ec07c' }}>{user} </span>
            <input
              className="terminal-input"
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Terminal;
