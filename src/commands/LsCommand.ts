import Command from './Command';

class LsCommand extends Command {
  name = 'ls';
  description = 'List all available commands';

  execute(commands?: Command[]): string {
    if (!commands) {
      return 'Error: Commands list not available.';
    }

    const commandList = commands
      .filter((command) => !command.secret)
      .map((cmd) => `  ${cmd.name.padEnd(20)} ${cmd.description}`)
      .join('\n');

    return `Available commands:\n\n${commandList}\n\nTip: Type 'help' for more information about using these commands.`;
  }
}

export default LsCommand;
