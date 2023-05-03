import Command from "./Command";

class HelpCommand extends Command {
  name = "help";
  description = "Show available commands";

  execute(commands: Command[]): string {
    const commandDescriptions = commands
      .filter((command) => !command.secret)
      .map((command) => `- ${command.name}: ${command.description}`).join("\n");
    return `Available commands:\n${commandDescriptions}`;
  }
}

export default HelpCommand;
