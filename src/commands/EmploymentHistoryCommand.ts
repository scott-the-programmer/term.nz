import Command from './Command';

class EmploymentHistoryCommand extends Command {
  name = 'history';
  description = 'Display employment history';

  execute(): string {
    const employmentHistory = `
Senior Site Reliability Engineer
Lightspeed Commerce · Full-time
Oct 2022 - Jan 2024 · 1 yr 4 mos
Auckland, New Zealand
Skills: Golang · Amazon Web Services (AWS) · Terraform · Apache Kafka

Principal Software Engineer
Serko Ltd. · Full-time
Jun 2022 - Oct 2022 · 5 mos
Auckland, New Zealand
Skills: Pulumi · .NET Framework · ASP.NET · Microsoft Azure 

Senior Devops Engineer
Zip Co Limited · Full-time
Nov 2019 - Jun 2022 · 2 yrs 8 mos
Auckland, New Zealand
Skills: Microsoft Azure · ASP.NET · .NET Core · Terraform · Pulumi

Software Engineer
IQVIA · Full-time
Jan 2016 - Nov 2019 · 3 yrs 11 mos
Auckland, New Zealand
Skills: ASP.NET · Scala · Apache Spark · Amazon Web Services (AWS) · Kubernetes

Graduate Software Engineer
DXC Technology · Full-time
Apr 2015 - Dec 2015 · 9 mos
Auckland, New Zealand

Scholarship Student
The University of Auckland
Nov 2014 - Feb 2015 · 5 mos

Teaching Assistant
The University of Auckland
Feb 2014 - Nov 2014 · 10 mos
Auckland, New Zealand
`;

    // This function will calculate the difference in months between two dates.
    const diffInMonths = (date1: Date, date2: Date) => {
      let diff = date2.getFullYear() - date1.getFullYear();
      diff = diff * 12 + (date2.getMonth() - date1.getMonth());
      return Math.abs(diff);
    }

    // Here we extract the start date of the latest employment.
    const startDateString = "Oct 2022";

    // Convert the month name to a number (1-12)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [monthStr, yearStr] = startDateString.split(' ');
    const monthNum = monthNames.indexOf(monthStr) + 1;

    const latestStartDate = new Date(Number(yearStr), monthNum - 1);

    const now = new Date();

    const monthsPassed = diffInMonths(latestStartDate, now);

    const formattedMonths = monthsPassed > 12 ? `${Math.floor(monthsPassed/12)} yrs ${monthsPassed%12} mos` : `${monthsPassed} mos`;

    const latestEmploymentEntry = `Devops Technical Lead
StarshipIt· Full-time
Jan 2024 - Present · ${formattedMonths}
Auckland, New Zealand
Skills: C# · .NET Core · .NET Framework · Microsoft Azure`;

    return `${latestEmploymentEntry}\n${employmentHistory}`;
  }
}

export default EmploymentHistoryCommand;
