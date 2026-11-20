export const siteConfig = {
  /** Full display name. Used in the navbar, hero, footer and SEO. */
  name: 'Faaiz Ali',
  /** Short initials used for the logo mark and favicon. */
  initials: 'FA',
  /** Job title / direction you are targeting. */
  role: 'Software QA Engineer',
  /** The line that appears directly under your name in the hero. */
  headline: 'Software QA Engineer | Final-Year MCA Student',
  tagline:
    'Final-year MCA student (CGPA 9.61) with a developer\'s understanding of how software breaks. I design test cases, log defects in JIRA and validate APIs with Postman and Pytest, and I am looking for a Junior QA / Software Tester role.',

  email: 'alisyedfaaiz@gmail.com',
  /** Optional. Leave as an empty string '' to hide the phone number entirely. */
  phone: '',
  /** Optional. Leave as an empty string '' to hide your location. */
  location: 'Jaipur, Rajasthan, India',
  availability: 'Open to Junior QA / Software Tester roles',

  links: {
    github: 'https://github.com/Faaiz-16',
    linkedin: 'https://www.linkedin.com/in/faaiz-ali-dev/',
    /** Optional extras — leave '' to hide. */
    twitter: '',
    leetcode: '',
  },

  githubUsername: 'Faaiz-16',

  /** Set to '' if you do not have a resume yet; the buttons then disappear. */
  resume: '/Faaiz_Resume.pdf',
  /** Leave '' to show the code card in the hero instead of a photo. */
  profileImage: '/images/profile/faaiz.jpeg',

  seo: {
    /** Browser tab title and the headline in Google results. */
    title: 'Faaiz Ali — Software QA Engineer & Final-Year MCA Student',
    /** Google shows roughly the first 155 characters. */
    description:
      'Portfolio of Faaiz Ali, a Software QA Engineer and final-year MCA student at Amity University Rajasthan. Manual, functional and API testing with Postman, Pytest and JIRA.',
    keywords: [
      'Faaiz Ali',
      'Software QA Engineer',
      'software tester',
      'manual testing',
      'API testing',
      'Postman',
      'Pytest',
      'JIRA',
      'MCA student',
      'QA engineer India',
    ],
    url: 'https://faaiz-ali-portfolio.vercel.app/',
    /** Social share image. 1200x630px. Put yours in public/images/general/. */
    ogImage: '/images/general/og-image.png',
    /** Used for the Twitter/X card. Leave '' if you have no account. */
    twitterHandle: '',
    /** Shown in the JSON-LD "Person" structured data. */
    jobTitle: 'Software QA Engineer',
  },

  facts: [
    { label: 'Degree', value: 'MCA', detail: 'Amity University Rajasthan · CGPA 9.61' },
    { label: 'Graduating', value: '2027', detail: 'Batch of 2027' },
    { label: 'Focus', value: 'QA', detail: 'Manual, functional & API testing' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
