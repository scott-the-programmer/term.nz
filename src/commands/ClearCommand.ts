import Command from "./Command";

class ClearCommand extends Command {
  name = "clear";
  description = "A command to clear the screen";

  execute(): string {
    return "clear"
  }
}

export default ClearCommand;
