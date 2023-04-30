import HelpCommand from './HelpCommand';
import Command from './Command';

class MockCommand extends Command {
  name = "mock";
  description = "A mock command";

  execute(_commands?: Command[]): string {
    return "This is a mock command";
  }
}

describe("HelpCommand", () => {
  it("should show available commands", () => {
    const commands = [new MockCommand(), new HelpCommand()];
    const helpCommand = new HelpCommand();

    const result = helpCommand.execute(commands);

    expect(result).toEqual(expect.stringContaining("- mock: A mock command"));
    expect(result).toEqual(expect.stringContaining("- help: Show available commands"));
  });
});