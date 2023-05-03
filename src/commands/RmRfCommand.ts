import Command from './Command';

class RmRfCommand extends Command {
  name = 'rm -rf';
  description = 'yolo';
  secret = true

  execute(): string {
    return 'delete';
  }
}

export default RmRfCommand;
