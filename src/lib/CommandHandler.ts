type CommandHandler = (command: string) => string;

export const handleCommand: CommandHandler = (command) => {
  const lowerCaseCommand = command.toLowerCase().trim();

  switch (lowerCaseCommand) {
    case 'help':
      return `
        Available commands:
        - help: Show available commands
        - about: Learn more about me
        - skills: View my skills
        - projects: See my projects
        - contact: Get in touch
      `;
    default:
      return `Unknown command: ${command}. Type 'help' for available commands.`;
  }
};
