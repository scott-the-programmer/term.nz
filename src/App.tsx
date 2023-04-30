import React, { useState } from 'react';
import Terminal from './components/Terminal';
import './App.css';
import CommandHandler from './commands/CommandHandler';

const commandHandler = new CommandHandler();

const App: React.FC = () => {
  const [userPrompts, setUserPrompts] = useState<{ input: string; output: string }[]>([]);

const handleCommand = (input: string) => {
  const result = commandHandler.handleCommand(input);
  if (result === 'clear') {
    setUserPrompts([]);
  } else if (typeof result === 'string') {
    setUserPrompts((prevUserPrompts) => [...prevUserPrompts, { input: input, output: result }]);
  } else {
    setUserPrompts((prevUserPrompts) => [...prevUserPrompts, result]);
  }
};
  return (
    <div className="App">
      <Terminal
        userPrompts={userPrompts}
        onCommand={handleCommand}
      />
    </div>
  );
};

export default App;
