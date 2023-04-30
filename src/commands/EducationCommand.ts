import Command from './Command';

class EducationCommand extends Command {
  name = 'education';
  description = 'Display education information';

  execute(): string {
    const education = `
The University of Auckland
Bachelor of Science (BSc), Computer Science
2012 - 2014
Grade: 8.33/9

Courses:
- CS 101 Principles of Programming
- CS 105 Principles of Computer Science
- CS 210 Computer Systems 1
- CS 215 Computer Systems 2
- CS 220 Algorithms & Data Structures
- CS 225 Discrete Structures in Mathematics
- CS 230 Software Construction
- CS 314 Modern Data Communications
- CS 335 Distributed Objects and Web Services
- CS 345 Human-Computer Interaction
- CS 369 Computational Sciences
- CS 373 Computer Graphics and Image Processing
`;

    return education;
  }
}

export default EducationCommand;
