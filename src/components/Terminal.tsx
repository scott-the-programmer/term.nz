import React, { useRef, useState } from 'react';
import {
  useScrollToBottom,
  useResetCurrentOutput,
  useUpdateOutputAndUserTyping,
  useSpin,
  useResetSpin,
} from '../hooks/terminal-hooks';
import './Terminal.css';

interface TerminalProps {
  userPrompts: { input: string; output: string }[];
  onCommand: (input: string) => void;
  delay: number;
}

const availableCommands = ['help', 'ls', 'whoami', 'clear', 'neofetch', 'about', 'employmenthistory', 'education', 'spin'];

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [outputIndex, setOutputIndex] = useState(0);
  const [currentOutput, setCurrentOutput] = useState('');
  const [userCanType, setUserCanType] = useState(true);
  const [spin, setSpin] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState('');

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
  useSpin(setSpin)
  useResetSpin(terminalRef, setSpin, spin)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      const match = availableCommands.find(cmd => cmd.startsWith(value.toLowerCase()));
      setSuggestion(match ? match.substring(value.length) : '');
    } else {
      setSuggestion('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = event.currentTarget.value.trim();
      setUserCanType(false);
      setOutputIndex(0);
      setCurrentOutput('');
      setSuggestion('');
      if (input) {
        setCommandHistory(prev => [...prev, input]);
        setHistoryIndex(-1);
        onCommand(input);
      } else {
        onCommand('');
      }
      event.currentTarget.value = '';
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const value = event.currentTarget.value;
      if (suggestion && value) {
        event.currentTarget.value = value + suggestion;
        setSuggestion('');
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        event.currentTarget.value = commandHistory[newIndex];
        setSuggestion('');
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          event.currentTarget.value = '';
        } else {
          setHistoryIndex(newIndex);
          event.currentTarget.value = commandHistory[newIndex];
        }
        setSuggestion('');
      }
    }
  };

  const terminalClassName = `terminal${spin ? ' terminal-spin' : ''}`;

  const user = getBrowserName() + '@scott-term:~$';
  return (
    <div className={terminalClassName}>
      <div className="terminal-tab">
        <div className="terminal-controls">
          <div className="terminal-control-btn close"></div>
          <div className="terminal-control-btn minimize"></div>
          <div className="terminal-control-btn maximize"></div>
        </div>
        <span style={{ color: '#ebdbb2' }}>scott-term</span>
      </div>
      <div className="terminal-body" ref={terminalRef}>
        {userPrompts.map((prompt, index) => {
          const isCurrentCommand = index === userPrompts.length - 1;
          let output = isCurrentCommand ? currentOutput : prompt.output;
          return (
            <div key={index} className="command-line">
              <span style={{ color: '#8ec07c' }}>{user}</span> {prompt.input}
              <br />
              {output}
              <br />
            </div>
          );
        })}
        {userCanType && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#8ec07c', flexShrink: 0 }}>{user}</span>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                ref={inputRef}
                className="terminal-input"
                autoComplete='off'
                onKeyDown={handleKeyPress}
                onChange={handleInputChange}
                autoFocus
              />
              {suggestion && (
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: 'rgba(220, 223, 228, 0.3)',
                    pointerEvents: 'none',
                    fontFamily: 'JetBrains Mono, Fira Code, Courier New, Courier, monospace',
                    fontSize: '15px',
                    paddingLeft: `${(inputRef.current?.value.length || 0) * 9}px`,
                  }}
                >
                  {suggestion}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
