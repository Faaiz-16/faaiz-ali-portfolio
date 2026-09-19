import type { LearningItem } from './types.ts';

export const currentlyLearning: LearningItem[] = [
  {
    topic: 'Advanced Python',
    note: 'Going past the basics — modules, testing and writing code others can read.',
    icon: 'code',
  },
  {
    topic: 'REST APIs',
    note: 'Designing endpoints, handling errors properly and documenting them.',
    icon: 'server',
  },
  {
    topic: 'Cloud computing & AWS',
    note: 'Working through the Cloud Practitioner material to understand how apps run in production.',
    icon: 'cloud',
  },
  {
    topic: 'Full-stack development',
    note: 'Connecting a React frontend to a Python backend end to end.',
    icon: 'layout',
  },
  {
    topic: 'AI-assisted development',
    note: 'Using AI tools to move faster without losing track of how the code works.',
    icon: 'sparkles',
  },
  {
    topic: 'Software engineering practices',
    note: 'Version control habits, code review and keeping projects maintainable.',
    icon: 'wrench',
  },
];
