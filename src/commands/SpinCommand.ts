import Command from './Command';

class SpinCommand extends Command {
  name = 'spin';
  description = 'Weeeeeeeeeeeeeeeeeeeeee';

  execute(): string {
    const event = new CustomEvent('spinTerminal');
    window.dispatchEvent(event);
    return 'Weeeeeeeeeeeeeeeeeeeeeee';
  }
}

export default SpinCommand;
