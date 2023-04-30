import Command from './Command';

class EmploymentHistoryCommand extends Command {
  name = 'history';
  description = 'Display employment history';

  execute(): string {
    const employmentHistory = `
Senior Site Reliability Engineer
Lightspeed Commerce · Full-time
Oct 2022 - Present · 7 mos
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
Auckland

Scholarship Student
The University of Auckland
Nov 2014 - Feb 2015 · 4 mos

Teaching Assistant
The University of Auckland
Feb 2014 - Nov 2014 · 10 mos
`;

    return employmentHistory;
  }
}

export default EmploymentHistoryCommand;
