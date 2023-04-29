import React from 'react';
import './Terminal.css';


interface TerminalProps {
  children: React.ReactNode;
}

const Terminal: React.FC<TerminalProps> = ({ children }) => {
  return (
    <div className="terminal">
      <div className="terminal-header">
        <span>Terminal Portfolio</span>
      </div>
      <div className="terminal-body">
        <pre>{children}</pre>
      </div>
    </div>
  );
};

export default Terminal;
