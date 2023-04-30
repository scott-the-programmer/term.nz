import Command from './Command';

class NeofetchCommand extends Command {
  name = 'neofetch';
  description = 'Display system information and React logo ASCII art';

  execute(): string {
    const os = window.navigator.platform;
    const cpu = window.navigator.hardwareConcurrency;
    const lang = window.navigator.language;

    const reactLogo = `

 ██▀███  ▓█████ ▄▄▄       ▄████▄  ▄▄▄█████▓
▓██ ▒ ██▒▓█   ▀▒████▄    ▒██▀ ▀█  ▓  ██▒ ▓▒
▓██ ░▄█ ▒▒███  ▒██  ▀█▄  ▒▓█    ▄ ▒ ▓██░ ▒░
▒██▀▀█▄  ▒▓█  ▄░██▄▄▄▄██ ▒▓▓▄ ▄██▒░ ▓██▓ ░ 
░██▓ ▒██▒░▒████▒▓█   ▓██▒▒ ▓███▀ ░  ▒██▒ ░ 
░ ▒▓ ░▒▓░░░ ▒░ ░▒▒   ▓▒█░░ ░▒ ▒  ░  ▒ ░░   
  ░▒ ░ ▒░ ░ ░  ░ ▒   ▒▒ ░  ░  ▒       ░    
  ░░   ░    ░    ░   ▒   ░          ░      
   ░        ░  ░     ░  ░░ ░               
                         ░                 
    `;

    const logoLines = reactLogo.split('\n');
    const infoLines = [
      '',
      '',
      `OS: ${os}`,
      `CPU: ${cpu} logical processors`,
      `Lang: ${lang}`,
      `Application: scott-term`,
      `Framework: React`,
    ];

    const maxLength = Math.max(logoLines.length, infoLines.length);
    let result = '';

    for (let i = 0; i < maxLength; i++) {
      const logoLine = logoLines[i] || '';
      const infoLine = infoLines[i] || '';
      const wrappedInfoLine = this.wrapText(infoLine, 40);
      const wrappedInfoLines = wrappedInfoLine.split('\n');

      result += `${logoLine.padEnd(22)} ${wrappedInfoLines[0]}\n`;

      for (let j = 1; j < wrappedInfoLines.length; j++) {
        result += `${''.padEnd(22)} ${wrappedInfoLines[j]}\n`;
      }
    }

    return result;
  }

  wrapText(text: string, width: number): string {
    let result = '';
    let line = '';

    text.split(' ').forEach((word, index) => {
      if (index === 0) {
        line += word + ' ';
      } else {
        if ((line + word).length >= width) {
          result += line.trim() + '\n';
          line = '';
        }

        line += word + ' ';
      }
    });

    if (line) {
      result += line.trim();
    }

    return result;
  }
}

export default NeofetchCommand;
