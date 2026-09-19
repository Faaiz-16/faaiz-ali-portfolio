/** Categories used by the filter buttons above the projects grid. */
export type ProjectCategory = 'Python' | 'Web' | 'AI' | 'Full Stack' | 'Other';

export interface Project {
  /** URL-safe id, used for the detail page: /projects/<slug> */
  slug: string;
  title: string;
  /** One or two lines shown on the card. */
  description: string;
  /** Categories this project belongs to (used by the filter buttons). */
  categories: ProjectCategory[];
  /** Technologies shown as tags. */
  technologies: string[];
  /** Optional — shown on the detail page under "The problem". */
  problem?: string;
  /** Optional — shown on the detail page under "What I built". */
  solution?: string;
  /** Optional bullet list of what the project can do. */
  features?: string[];
  /** Optional — what you learned or found difficult. */
  learnings?: string[];
  /** Leave undefined or '' to hide the button. */
  githubUrl?: string;
  liveUrl?: string;
  /** Path inside public/, e.g. '/images/projects/my-app.png'. */
  image?: string;
  /** Alt text for the image. Required whenever `image` is set. */
  imageAlt?: string;
  /** `true` pins the project to the top of the grid with a badge. */
  featured?: boolean;
  /** Free text, e.g. 'In progress' or '2025'. Shown as a small label. */
  status?: string;
}

export interface SkillCategory {
  /** Category heading, e.g. 'Programming languages'. */
  name: string;
  /** Lucide icon name — see src/lib/icons.ts for the allowed values. */
  icon: string;
  /** Optional one-line explanation shown under the heading. */
  description?: string;
  skills: Skill[];
}

/** Descriptive proficiency labels rather than numeric ratings. */
export type SkillLevel = 'Learning' | 'Familiar' | 'Working knowledge' | 'Comfortable';

export interface Skill {
  name: string;
  /** Optional. Omit it entirely and no level label is shown. */
  level?: SkillLevel;
}

export interface Experience {
  role: string;
  company: string;
  /** Free text, e.g. 'Jun 2025 – Jul 2025'. */
  period: string;
  /** Optional, e.g. 'Remote' or 'Jaipur, India'. */
  location?: string;
  /** Optional, e.g. 'Internship' or 'Part-time'. */
  type?: string;
  /** Short paragraph describing the role in plain language. */
  description: string;
  /** Bullet points of what you actually did. */
  highlights?: string[];
  technologies?: string[];
  /** Optional link to a certificate or letter. */
  certificateUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location?: string;
  /** Optional. */
  grade?: string;
  description?: string;
  coursework?: string[];
  /** `true` marks this as your current studies. */
  current?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  /** Free text, e.g. 'Mar 2025'. */
  date: string;
  /**
   * 'completed'   — you finished it and hold the credential
   * 'in-progress' — you are still working through it
   */
  status: 'completed' | 'in-progress';
  credentialId?: string;
  credentialUrl?: string;
  /** Path inside public/images/certifications/. */
  image?: string;
  /** Optional one-line summary of what the course covered. */
  summary?: string;
}

export interface LearningItem {
  topic: string;
  /** Why you are learning it — one short line. */
  note: string;
  /** Lucide icon name — see src/lib/icons.ts. */
  icon: string;
}
