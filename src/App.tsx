import React, { useState } from 'react';
import Terminal from './components/Terminal';
import ParticleBackground from './components/ParticleBackground';
import './App.css';
import CommandHandler from './commands/CommandHandler';

const commandHandler = new CommandHandler();

const welcomeBanner = `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ███████╗ ██████╗ ██████╗ ████████╗████████╗    ███╗   ███╗║
║   ██╔════╝██╔════╝██╔═══██╗╚══██╔══╝╚══██╔══╝    ████╗ ████║║
║   ███████╗██║     ██║   ██║   ██║      ██║       ██╔████╔██║║
║   ╚════██║██║     ██║   ██║   ██║      ██║       ██║╚██╔╝██║║
║   ███████║╚██████╗╚██████╔╝   ██║      ██║       ██║ ╚═╝ ██║║
║   ╚══════╝ ╚═════╝ ╚═════╝    ╚═╝      ╚═╝       ╚═╝     ╚═╝║
║                                                              ║
║              Welcome to Scott's Terminal Portfolio           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Type 'help' or 'ls' to see available commands
Type 'neofetch' to see system info
`;

const App: React.FC = () => {
  const [userPrompts, setUserPrompts] = useState<
    { input: string; output: string }[]
  >([{ input: '', output: welcomeBanner }]);
  const [terminalDeleted, setTerminalDeleted] = useState<boolean>(false);
  const handleCommand = (input: string) => {
    const result = commandHandler.handleCommand(input);
    if (result === 'clear') {
      setUserPrompts([]);
    } else if (result === 'delete') {
      setUserPrompts([]);
      setTerminalDeleted(true);
    } else if (typeof result === 'string') {
      setUserPrompts((prevUserPrompts) => [
        ...prevUserPrompts,
        { input: input, output: result },
      ]);
    } else {
      setUserPrompts((prevUserPrompts) => [...prevUserPrompts, result]);
    }
  };
  return (
    <div className="App">
      <ParticleBackground />
      {!terminalDeleted && (
        <Terminal
          userPrompts={userPrompts}
          onCommand={handleCommand}
          delay={1}
        />
      )}
    </div>
  );
};

export default App;
