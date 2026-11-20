import type { SkillCategory } from './types.ts';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Testing',
    icon: 'bug',
    description: 'How I find out where software breaks.',
    skills: [
      { name: 'Manual Testing', level: 'Comfortable' },
      { name: 'Functional Testing', level: 'Comfortable' },
      { name: 'Regression Testing', level: 'Working knowledge' },
      { name: 'Test Case Design', level: 'Comfortable' },
      { name: 'Bug Reporting', level: 'Comfortable' },
      { name: 'Test Documentation', level: 'Working knowledge' },
    ],
  },
  {
    name: 'API & Automation',
    icon: 'server',
    description: 'Validating endpoints and automating the checks.',
    skills: [
      { name: 'Postman', level: 'Comfortable' },
      { name: 'Pytest', level: 'Working knowledge' },
      { name: 'REST APIs', level: 'Working knowledge' },
    ],
  },
  {
    name: 'Process',
    icon: 'checklist',
    description: 'The lifecycle a bug and a release go through.',
    skills: [
      { name: 'SDLC', level: 'Working knowledge' },
      { name: 'STLC', level: 'Working knowledge' },
      { name: 'Agile / Scrum', level: 'Working knowledge' },
      { name: 'Bug Life Cycle', level: 'Comfortable' },
    ],
  },
  {
    name: 'Tools',
    icon: 'wrench',
    description: 'What I use to track, test and ship.',
    skills: [
      { name: 'JIRA', level: 'Working knowledge' },
      { name: 'Git & GitHub', level: 'Working knowledge' },
      { name: 'VS Code', level: 'Comfortable' },
      { name: 'PyCharm', level: 'Comfortable' },
    ],
  },
  {
    name: 'Database',
    icon: 'database',
    description: 'Checking that the data behind a feature is right.',
    skills: [
      { name: 'MySQL', level: 'Working knowledge' },
      { name: 'SQL queries for data validation', level: 'Working knowledge' },
    ],
  },
  {
    name: 'Languages',
    icon: 'code',
    description: 'What I read and write code in.',
    skills: [
      { name: 'Python', level: 'Comfortable' },
      { name: 'Java', level: 'Comfortable' },
      { name: 'HTML', level: 'Comfortable' },
    ],
  },
];
