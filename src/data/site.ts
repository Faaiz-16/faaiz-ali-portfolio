export const siteConfig = {
  /** Full display name. Used in the navbar, hero, footer and SEO. */
  name: 'Faaiz Ali',
  /** Short initials used for the logo mark and favicon. */
  initials: 'FA',
  /** Job title / direction you are targeting. */
  role: 'Python Developer',
  /** The line that appears directly under your name in the hero. */
  headline: 'Final-Year MCA Student | Python Developer',
  tagline:
    'I build practical software with Python, and I am currently finishing my MCA at Amity University Rajasthan. I am looking for a software or Python developer role where I can keep learning by shipping real things.',

  email: 'alisyedfaaiz@gmail.com',
  /** Optional. Leave as an empty string '' to hide the phone number entirely. */
  phone: '',
  /** Optional. Leave as an empty string '' to hide your location. */
  location: 'Rajasthan, India',
  availability: 'Open to Software developer / Python developer roles from 2027',

  links: {
    github: 'https://github.com/Faaiz-16',
    linkedin: 'https://www.linkedin.com/in/faaiz-ali-953661312/',
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
    title: 'Faaiz Ali — Software Developer & Final-Year MCA Student',
    /** Google shows roughly the first 155 characters. */
    description:
      'Portfolio of Faaiz Ali, a final-year MCA student at Amity University Rajasthan building software with Python, Java and JavaScript. See projects, skills and resume.',
    keywords: [
      'Faaiz Ali',
      'Python developer',
      'software developer',
      'MCA student',
      'React portfolio',
      'Flask',
      'full stack developer India',
    ],
    /** TODO: set to the deployed domain (no trailing slash). */
    url: 'https://faaiz-ali-portfolio.vercel.app/',
    /** Social share image. 1200x630px. Put yours in public/images/general/. */
    ogImage: '/images/general/og-image.png',
    /** Used for the Twitter/X card. Leave '' if you have no account. */
    twitterHandle: '',
    /** Shown in the JSON-LD "Person" structured data. */
    jobTitle: 'Software Developer',
  },

  facts: [
    { label: 'Degree', value: 'MCA', detail: 'Amity University Rajasthan' },
    { label: 'Graduating', value: '2027', detail: 'Batch of 2027' },
    { label: 'Focus', value: 'Python', detail: 'Backend & applications' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
