abstract class Command {
  abstract name: string;
  abstract description: string;
  secret: boolean = false;

  execute(_commands?: Command[]): string {
    return "";
  }
}

export default Command;
