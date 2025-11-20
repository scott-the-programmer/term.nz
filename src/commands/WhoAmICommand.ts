import Command from './Command';

class WhoAmICommand extends Command {
  name = 'whoami';
  description = 'Display current user information';

  execute(): string {
    const browserName = this.getBrowserName();
    const platform = window.navigator.platform;
    const language = window.navigator.language;
    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const connection = (navigator as any).connection;
    const connectionType = connection ? connection.effectiveType : 'unknown';

    return `
╭─────────────────────────────────────────╮
│           USER INFORMATION              │
╰─────────────────────────────────────────╯

  User Agent    : ${browserName}
  Platform      : ${platform}
  Language      : ${language}
  Screen        : ${screenRes}
  Connection    : ${connectionType}
  Location      : ${Intl.DateTimeFormat().resolvedOptions().timeZone}

  You are viewing Scott's terminal portfolio
  from ${browserName} on ${platform}
`;
  }

  getBrowserName(): string {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
    if (userAgent.includes('Edge') || userAgent.includes('Edg')) return 'Edge';
    if (userAgent.includes('Trident')) return 'Internet Explorer';
    return 'Unknown Browser';
  }
}

export default WhoAmICommand;
