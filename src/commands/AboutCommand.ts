import Command from './Command';

class AboutCommand extends Command {
  name = 'about';
  description = 'Display information about the user';

  execute(): string {
    const userInfo = `
Experienced bug clean code typer who resides in Auckland, New Zealand. Actively purchasing video games that I will never play.

I'm mainly involved in ☁️ cloud and deploying code 🚀
`;

    const socials = `
GitHub: https://github.com/scott-the-programmer/
Twitter: https://twitter.com/ScottProgrammer/
Instagram: https://www.instagram.com/shxppingtrxllxy/
LinkedIn: https://www.linkedin.com/in/scottalexandermurray/
`;

    return `${userInfo}\nSocials:${socials}`;
  }
}

export default AboutCommand;
