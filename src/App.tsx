import React, { useState } from 'react';
import Terminal from './components/Terminal';
import { handleCommand } from './lib/CommandHandler';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { addCommand, clearCommands } from './slices/commandsSlice';

export interface Command {
  command: string;
  output: string;
}

const App: React.FC = () => {
  const commands = useSelector((state: RootState) => state.commands);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newCommand = inputValue.trim().toLowerCase();

      if (newCommand === 'clear') {
        dispatch(clearCommands());
      } else {
        const output = handleCommand(newCommand);
        dispatch(addCommand({ command: newCommand, output }));
      }

      setInputValue('');
    }
  };

  return (
    <div className="App">
      <Terminal>
        {commands.map(({ command, output }, index) => (
          <React.Fragment key={index}>
            &gt; {command}
            {'\n'}
            {output}
            {'\n'}
          </React.Fragment>
        ))}
        &gt;{' '}
        <input
          className="terminal-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      </Terminal>
    </div>
  );
};

export default App;
