import CommandHandler from "./CommandHandler";

describe("CommandHandler", () => {
  it("returns correct output for known commands", () => {
    const commandHandler = new CommandHandler();

    expect(commandHandler.handleCommand("help")).toMatchInlineSnapshot(`
"Available commands:
- help: Show available commands
- clear: A command to clear the screen
- neofetch: Display system information and React logo ASCII art
- about: Display information about the user
- history: Display employment history
- education: Display education information
- spin: Weeeeeeeeeeeeeeeeeeeeee"
`);
    expect(commandHandler.handleCommand("clear")).toEqual("clear");
    expect(commandHandler.handleCommand("neofetch")).toContain("OS:");
    expect(commandHandler.handleCommand("about")).toMatch(/clean code typer/);
    expect(commandHandler.handleCommand("history")).toMatch(/Auckland/);
    expect(commandHandler.handleCommand("education")).toMatch(/Bachelor/);
  });

  it("returns error for unknown commands", () => {
    const commandHandler = new CommandHandler();

    expect(commandHandler.handleCommand("unknown-command")).toMatch(
      /Unknown command/
    );
  });
});
