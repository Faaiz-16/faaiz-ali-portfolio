import type { Experience } from './types.ts';

export const experiences: Experience[] = [
  {
    role: 'Python Developer Intern',
    company: 'Codec Technologies',
    period: 'June 2026 – July 2026',
    location: 'Remote – Mumbai, Maharashtra, India',
    type: 'Internship (Remote)',
    description:
      'Built and tested two Python applications end to end, validating live data and API responses and checking edge cases before each fix was deployed.',
    highlights: [
      'Stock Market Dashboard: Built a real-time dashboard with Python, Streamlit, Pandas and Plotly, and validated live API data against source values for accuracy.',
      'Image Recognition System: Built and tested an image recognition pipeline (TensorFlow/Keras, Flask, OpenCV), verifying REST API responses for valid images, unsupported formats, corrupt and oversized files.',
      'Edge-case testing: Tested API timeouts, invalid tickers and market-closed periods, then debugged and retested the fixes before deployment.',
    ],
    technologies: ['Python', 'Pandas', 'Streamlit', 'Plotly', 'Flask', 'TensorFlow', 'Keras', 'OpenCV'],
    certificateUrl: '',
  },
];
