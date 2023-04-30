abstract class Command {
  abstract name: string;
  abstract description: string;

  execute(_commands?: Command[]): string {
    return "";
  }
}

export default Command;
