import React, { useRef, useState } from 'react';
import { useScrollToBottom , useResetCurrentOutput, useUpdateOutputAndUserTyping } from '../hooks/terminal-hooks';
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
