# Faaiz Ali — Developer Portfolio

Personal portfolio website for Faaiz Ali, a final-year MCA student (Amity University Rajasthan) building software with Python and JavaScript. It presents projects, skills, experience, education, certifications and a downloadable resume in a single responsive page.

All content lives in plain TypeScript data files, so updating the portfolio means editing data, not components.

## Features

- **Single-page portfolio** with Hero, About, Skills, Projects, Experience, Education, Certifications, Currently Learning, GitHub, Resume and Contact sections
- **Data-driven content** — name, links, projects, skills, experience, education and certifications are all defined in `src/data/`
- **Project detail pages** at `/projects/<slug>`, generated from the project data, with a category filter on the grid
- **Live GitHub section** listing the latest public repositories from the GitHub API; the card is hidden if the request fails
- **Contact section** with email and social links, plus an optional contact form (see [Environment variables](#environment-variables))
- **Dark and light themes** that follow the system setting; the visitor's choice is saved
- **Accessibility** — semantic HTML, skip link, visible focus states, keyboard-friendly navigation, and support for `prefers-reduced-motion`
- **SEO** — title, description, Open Graph and Twitter tags, canonical URL and Person structured data are generated at build time from `src/data/site.ts`, along with `sitemap.xml` and `robots.txt`
- **Custom 404 page** and an error boundary so a rendering error never leaves a blank screen
- **Small bundle** — the project and 404 pages are lazy-loaded

## Tech stack

| Tool                                                         | Purpose                                     |
| ------------------------------------------------------------ | ------------------------------------------- |
| [React 19](https://react.dev)                                | UI library                                  |
| [TypeScript](https://www.typescriptlang.org)                 | Type checking                               |
| [Vite 8](https://vite.dev)                                   | Dev server and build tool                   |
| [Tailwind CSS 4](https://tailwindcss.com)                    | Styling and design tokens (`src/index.css`) |
| [React Router 7](https://reactrouter.com)                    | Routing                                     |
| [Lucide React](https://lucide.dev)                           | Icons                                       |
| [oxlint](https://oxc.rs) and [Prettier](https://prettier.io) | Linting and formatting                      |

## Getting started

### Prerequisites

- **Node.js** `^20.19.0` or `>=22.12.0` (required by Vite 8)
- **npm** (bundled with Node.js)

### Install

```bash
git clone https://github.com/Faaiz-16/faaiz-ali-portfolio.git
cd faaiz-ali-portfolio
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL printed in the terminal (normally <http://localhost:5173>). The page reloads as you edit files.

### Build and preview

```bash
npm run build     # type-check, then build to dist/
npm run preview   # serve the production build locally
```

### Available scripts

| Script                                    | Description                                           |
| ----------------------------------------- | ----------------------------------------------------- |
| `npm run dev`                             | Start the development server                          |
| `npm run build`                           | Type-check and create the production build in `dist/` |
| `npm run preview`                         | Preview the production build                          |
| `npm run typecheck`                       | Run the TypeScript compiler without emitting files    |
| `npm run lint` / `npm run lint:fix`       | Lint the code (and auto-fix where possible)           |
| `npm run format` / `npm run format:check` | Format the code with Prettier, or check formatting    |
| `npm run check`                           | Type-check, lint and build in one go                  |

## Configuration

### Content

| To change                                         | Edit                                                                                   |
| ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Name, role, email, social links, resume path, SEO | `src/data/site.ts`                                                                     |
| Projects                                          | `src/data/projects.ts`                                                                 |
| Skills                                            | `src/data/skills.ts`                                                                   |
| Experience                                        | `src/data/experience.ts`                                                               |
| Education                                         | `src/data/education.ts`                                                                |
| Certifications                                    | `src/data/certifications.ts`                                                           |
| "Currently learning"                              | `src/data/learning.ts`                                                                 |
| Navigation links                                  | `src/data/navigation.ts`                                                               |
| Colours, fonts, spacing                           | `@theme` block in `src/index.css`                                                      |
| Resume file                                       | Put the PDF in `public/` and set `resume` in `src/data/site.ts`                        |
| Profile photo                                     | Put the image in `public/images/profile/` and set `profileImage` in `src/data/site.ts` |
| Project screenshots                               | Put images in `public/images/projects/` and reference them from `src/data/projects.ts` |

Adding a project or skill only requires editing its data file; no component changes are needed. See [CUSTOMIZATION.md](./CUSTOMIZATION.md) for step-by-step examples.

While running `npm run dev`, the browser console lists any values that still contain a `TODO` placeholder.

### Environment variables

The project works without any environment variables. One optional variable enables a contact form:

| Variable                | Description                                                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_CONTACT_ENDPOINT` | URL of a form-handling service (for example Formspree). When empty, the contact section shows email and social links instead of a form. |

To use it locally, copy the template and fill in the value:

```bash
cp .env.example .env.local
```

`.env.local` is ignored by Git. Variables prefixed with `VITE_` are bundled into the client-side JavaScript and are therefore public, so never put a private key or token in one.

## Project structure

```
.
├── public/                  Static files served as-is
│   └── images/              profile, projects, certifications, general
├── src/
│   ├── components/
│   │   ├── layout/          Navbar, Footer, ErrorBoundary, ScrollToTop
│   │   ├── sections/        One component per homepage section
│   │   └── ui/              Small reusable components
│   ├── data/                Site configuration and all portfolio content
│   ├── hooks/               Theme, scroll, reveal and GitHub hooks
│   ├── lib/                 Icon registry and helper functions
│   ├── pages/               Home, ProjectDetail, NotFound
│   ├── App.tsx              Routes and page shell
│   ├── main.tsx             Entry point
│   └── index.css            Design tokens and global styles
├── .env.example             Environment variable template
├── CUSTOMIZATION.md         How to change content and styling
├── index.html
├── vercel.json              SPA rewrites and cache headers for Vercel
└── vite.config.ts           Build config, SEO tags, sitemap and robots.txt
```

## Deployment

The project is configured for [Vercel](https://vercel.com).

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output directory `dist`).
4. If you use the contact form, add `VITE_CONTACT_ENDPOINT` under **Settings → Environment Variables** and redeploy, since the value is read at build time.
5. Deploy.

`vercel.json` rewrites unknown paths to `index.html`, so refreshing a project page such as `/projects/<slug>` works instead of returning a 404.

**After the first deploy**, set `seo.url` in `src/data/site.ts` to the real site address (no trailing slash) and push again. It is used for the canonical URL, social-share tags, `sitemap.xml` and `robots.txt`.

To use a custom domain, add it under **Project → Settings → Domains** in Vercel and create the DNS records it shows at your domain registrar.

## Troubleshooting

- **`npm install` or `npm run dev` fails** — check `node -v` against the [prerequisites](#prerequisites).
- **A project image is missing** — the path in `src/data/projects.ts` must start with `/images/…` and point to a file inside `public/images/`.
- **A GitHub or LinkedIn button is missing** — the URL in `src/data/site.ts` is empty or still contains `_HERE`. Placeholder links are hidden on purpose.
- **Refreshing a project page returns 404 after deploying** — make sure `vercel.json` is committed.
