import type { Education } from './types.ts';

export const education: Education[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Amity University Rajasthan',
    period: '2025-2027',
    location: 'Jaipur, Rajasthan',
    grade: 'CGPA ~ 9.61',
    current: true,
    description: 'Enhancing my practical skills in software development, with a focused interest in building real-world applications and preparing for a Python development role.',
    coursework: [
      // TODO — list real subjects from your syllabus, or delete this block.
      'TODO — Subject name',
      'TODO — Subject name',
    ],
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Lal Bahadur Shastri PG College',
    period: '2022-2025',
    location: 'Jaipur, Rajasthan',
    grade: 'Score ~ 75%',
    description: 'Built a strong foundation in programming, database management, web development, and software development concepts while developing practical projects using technologies like Python, Java, HTML, CSS, and JavaScript.',
  },
    {
    degree: 'Senior Secondary Education (12th)',
    institution: 'Saint Soldier Public School',
    period: '2021-22',
    location: 'Jaipur, Rajasthan',
    grade: 'Score ~ 72%',
    description: 'Developed a foundation in communication, logical thinking, and analytical skills while building an interest in technology and computer applications.',
  },
    {
    degree: 'Secondary Education (10th)',
    institution: 'Saint Soldier Public School',
    period: '2019-2020',
    location: 'Jaipur, Rajasthan',
    grade: 'Score ~ 77%',
    description: 'Built a strong academic foundation and developed essential skills in logical thinking, problem-solving, communication, and learning new concepts.',
  },
];
