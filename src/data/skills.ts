import type { SkillCategory } from './types.ts';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming languages',
    icon: 'code',
    description: 'The languages I write day to day.',
    skills: [
      { name: 'Python', level: 'Comfortable' },
      { name: 'Java', level: 'Comfortable' },
      { name: 'JavaScript', level: 'Working knowledge' },
      { name: 'SQL', level: 'Working knowledge' },
    ],
  },
  {
    name: 'Frontend',
    icon: 'layout',
    description: 'Building interfaces that work on any screen.',
    skills: [
      { name: 'HTML', level: 'Comfortable' },
      { name: 'CSS', level: 'Working knowledge' },
      { name: 'JavaScript', level: 'Working knowledge' },
      { name: 'React', level: 'Learning' },
    ],
  },
  {
    name: 'Backend & APIs',
    icon: 'server',
    description: 'Server-side logic and the endpoints that connect things.',
    skills: [
      { name: 'Python', level: 'Comfortable' },
      { name: 'Flask', level: 'Learning' },
      { name: 'REST APIs', level: 'Working knowledge' },
    ],
  },
  {
    name: 'Databases',
    icon: 'database',
    description: 'Storing and querying data.',
    skills: [
      { name: 'SQL', level: 'Working knowledge' },
      { name: 'MySQL', level: 'Familiar' },
      { name: 'PostgreSQL', level: 'Learning' },
    ],
  },
  {
    name: 'Tools & workflow',
    icon: 'wrench',
    description: 'What I use to build, debug and ship.',
    skills: [
      { name: 'Git & GitHub', level: 'Working knowledge' },
      { name: 'PyCharm', level: 'Comfortable' },
      { name: 'VS Code', level: 'Comfortable' },
      { name: 'Google Colab', level: 'Comfortable' },
    ],
  },
  {
    name: 'Cloud & AI',
    icon: 'cloud',
    description: 'Areas I am actively studying rather than claiming expertise in.',
    skills: [
      { name: 'AWS', level: 'Familiar' },
      { name: 'Cloud computing', level: 'Familiar' },
      { name: 'AI-assisted development', level: 'Familiar' },
    ],
  },
];
