import Command from "./Command";
import HelpCommand from "./HelpCommand";
import ClearCommand from "./ClearCommand";
import NeoFetchCommand from "./NeoFetchCommand";
import AboutCommand from "./AboutCommand";
import EmploymentHistoryCommand from "./EmploymentHistoryCommand";
import EducationCommand from "./EducationCommand";

class CommandHandler {
  commands: Command[];

  constructor() {
    this.commands = [
      new HelpCommand(),
      new ClearCommand(),
      new NeoFetchCommand(),
      new AboutCommand(),
      new EmploymentHistoryCommand(),
      new EducationCommand(),
    ];
  }

  handleCommand(commandName: string): string {
    if (commandName.trim() === "") {
      return "";
    }
    const command = this.commands.find((cmd) => cmd.name === commandName.toLowerCase());
    if (command) {
      if (command instanceof HelpCommand) {
        return command.execute(this.commands);
      }
      return command.execute();
    }

    return `Unknown command: '${commandName}'. Type 'help' for available commands.`;
  }
}

export default CommandHandler;