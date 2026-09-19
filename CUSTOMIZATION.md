# Customisation guide

Everything you are likely to change lives in **`src/data/`**. You should almost
never need to open a file inside `src/components/`.

After any edit, **save the file** — the browser updates by itself while
`npm run dev` is running.

---

## Quick answers

| I want to change…               | Open this file                       |
| ------------------------------- | ------------------------------------ |
| My name / role / tagline        | `src/data/site.ts`                   |
| My email, GitHub, LinkedIn      | `src/data/site.ts` → `links`         |
| A project                       | `src/data/projects.ts`               |
| My skills                       | `src/data/skills.ts`                 |
| My internship / experience      | `src/data/experience.ts`             |
| My education                    | `src/data/education.ts`              |
| My certifications               | `src/data/certifications.ts`         |
| "Currently learning" list       | `src/data/learning.ts`               |
| Navbar links & their order      | `src/data/navigation.ts`             |
| Colours, fonts, spacing         | `src/index.css` (the `@theme` block) |
| Order of homepage sections      | `src/pages/Home.tsx`                 |
| Page title / Google description | `src/data/site.ts` → `seo`           |
| My resume PDF                   | `public/` + `resume` in `site.ts`    |
| My profile photo                | `public/images/profile/` + `site.ts` |
| The About paragraphs            | `src/components/sections/About.tsx`  |

---

## Finding what still needs filling in

Run `npm run dev`, open the site, then open your browser's developer console
(**F12**, or right-click → Inspect → Console). You will see a collapsed group
like:

```
⚠ Portfolio: 38 placeholder value(s) still to replace
```

Click it to expand. Every line tells you exactly which file and which field
still contains a `TODO`. Work through the list and it will eventually say:

```
✓ Portfolio: no placeholders left. Nice.
```

This check only runs during development — visitors never see it.

---

## Want to change your name?

`src/data/site.ts`:

```ts
name: 'Faaiz Ali',        // navbar, hero, footer, SEO
initials: 'FA',           // the square logo mark
```

The favicon is a separate file. Open `public/favicon.svg` and change the two
letters inside the `<text>` element.

---

## Want to change your email?

`src/data/site.ts`:

```ts
email: 'your.real.email@gmail.com',
```

That one line updates the contact card, the "Send me an email" button and the
mail icon in the footer.

---

## Want to add GitHub or LinkedIn?

`src/data/site.ts`:

```ts
links: {
  github: 'https://github.com/your-username',
  linkedin: 'https://www.linkedin.com/in/your-profile',
  twitter: '',      // leave empty and the icon disappears
  leetcode: '',
},
githubUsername: 'your-username',   // used by the GitHub section
```

Any link left as `''` (or still containing `_HERE`) is hidden automatically —
the site never shows a button that goes nowhere.

---

## Want to add a project?

Open `src/data/projects.ts` and add one object to the array:

```ts
{
  slug: 'expense-tracker',                 // becomes /projects/expense-tracker
  title: 'Expense Tracker',
  description: 'A small web app for logging daily spending and seeing monthly totals.',
  categories: ['Python', 'Web'],           // drives the filter buttons
  technologies: ['Python', 'Flask', 'MySQL'],
  problem: 'I kept losing track of where my money went each month.',
  solution: 'A Flask app with a simple form and a monthly summary page.',
  features: ['Add and edit expenses', 'Monthly totals by category'],
  learnings: ['How to design a database table before writing any code'],
  githubUrl: 'https://github.com/your-username/expense-tracker',
  liveUrl: '',                             // '' hides the Live demo button
  image: '/images/projects/expense-tracker.png',
  imageAlt: 'The Expense Tracker monthly summary page',
  featured: true,                          // pins it to the top with a badge
}
```

That is the whole job. The card, the filters, the counts and the detail page at
`/projects/expense-tracker` all update on their own.

**Rules to remember**

- `slug` must be unique and use only lowercase letters, numbers and hyphens.
- `description`, `title`, `slug`, `categories` and `technologies` are required.
- Everything else is optional — delete a line and that part of the page
  disappears instead of showing an empty box.
- `categories` must be one or more of:
  `'Python' | 'Web' | 'AI' | 'Full Stack' | 'Other'`.
  To invent a new one, add it to `ProjectCategory` in `src/data/types.ts` first.
- Filter buttons only appear once you have 4 or more projects.

---

## Want to add a skill?

`src/data/skills.ts` — find the right category and add a line:

```ts
{ name: 'Django', level: 'Learning' },
```

`level` is optional and must be one of:
`'Learning' | 'Familiar' | 'Working knowledge' | 'Comfortable'`.
Leave it out entirely and no label is shown.

To add a whole new category, copy an existing block. `icon` has to be one of the
keys in `src/lib/icons.ts` (`code`, `layout`, `server`, `database`, `wrench`,
`cloud`, `sparkles`). To add a new icon, follow the instructions in that file.

---

## Want to add experience?

`src/data/experience.ts` — newest entry first:

```ts
{
  role: 'Python Developer Intern',
  company: 'Codec Technologies',
  period: 'Jun 2025 – Jul 2025',
  location: 'Remote',
  type: 'Internship',
  description: 'What the internship involved, in two or three sentences.',
  highlights: ['Something you built', 'Something you learned'],
  technologies: ['Python', 'Flask'],
  certificateUrl: 'https://link-to-your-certificate',
}
```

Delete every entry and the whole Experience section hides itself.

---

## Want to add a certification?

`src/data/certifications.ts`:

```ts
{
  name: 'Google AI Essentials',
  issuer: 'Google',
  date: 'Mar 2025',
  status: 'completed',          // or 'in-progress'
  credentialId: 'ABC123',       // optional
  credentialUrl: 'https://…',   // optional — adds a "Verify credential" link
  image: '/images/certifications/google-ai.png',  // optional
  summary: 'Covered prompting, AI workflows and responsible use.',
}
```

**Please keep `status` honest.** `'completed'` means you hold the credential.
`'in-progress'` means you are still working through it. The card says so in
plain words, and recruiters do check.

---

## Want to change your resume?

Put the PDF in the `public/` folder and point `resume` at it in
`src/data/site.ts`:

```ts
resume: '/Faaiz_Resume.pdf',
```

To update it later, replace the PDF and keep the same file name. Both the
"Download resume" and "View in browser" buttons keep working — no code change.

- Want the buttons gone? Set `resume: ''` in `src/data/site.ts`.
- Using a different file name? Change the path in `site.ts` to match.

---

## Want to change your profile photo?

1. Save your photo as `public/images/profile/faaiz.jpg`
   (a portrait crop works best — the frame is 4:5).
2. In `src/data/site.ts`:

```ts
profileImage: '/images/profile/faaiz.jpg',
```

Leave it as `''` and the hero shows the terminal-style code card instead. Both
look fine — pick whichever you prefer.

If the file is missing or the path is wrong, a neutral placeholder block is
shown rather than a broken-image icon.

---

## Want to change colours / the theme?

Open `src/index.css` and edit the `@theme` block near the top. The light theme
values live there; the dark theme overrides are in the `.dark` block directly
below it.

```css
@theme {
  --color-accent: oklch(0.55 0.17 253); /* the main brand colour */
  --color-bg: oklch(0.99 0.002 250); /* page background       */
  --color-surface: oklch(1 0 0); /* cards                 */
  --color-text: oklch(0.22 0.015 255); /* main text             */
  --color-muted: oklch(0.52 0.015 255); /* secondary text        */
  --color-border: oklch(0.91 0.006 250);
}
```

**Not comfortable with `oklch()`?** Plain hex works too:

```css
--color-accent: #7c3aed; /* purple */
--color-accent-hover: #6d28d9;
```

Just remember to change the matching value in the `.dark` block so dark mode
still reads well — dark mode usually needs a _lighter_ accent.

Some ready-made accents to try:

| Colour           | Light `--color-accent` | Dark `--color-accent` |
| ---------------- | ---------------------- | --------------------- |
| Indigo (default) | `#4f46e5`              | `#818cf8`             |
| Emerald          | `#059669`              | `#34d399`             |
| Rose             | `#e11d48`              | `#fb7185`             |
| Amber            | `#d97706`              | `#fbbf24`             |

After changing a colour, **check both themes** using the sun/moon toggle, and
make sure text is still easy to read.

Other things in the same block: `--font-sans`, `--font-mono`, `--radius-card`,
`--shadow-card` and `--container-content` (the maximum page width).

If you change the fonts, also update the Google Fonts `<link>` in `index.html`.

---

## Want to reorder or remove a section?

Sections are listed, in order, in `src/pages/Home.tsx`:

```tsx
<Hero />
<About />
<Skills />
<Projects />
…
```

Move a line to reorder. Delete a line to remove it. If the section has a navbar
link, also delete its entry from `src/data/navigation.ts`.

---

## Want to change what Google shows?

`src/data/site.ts` → the `seo` block:

```ts
seo: {
  title: 'Faaiz Ali — Software Developer & Final-Year MCA Student',
  description: 'Roughly 155 characters. This is the grey text under the link.',
  url: 'https://your-domain.com',   // set this once you deploy
  ogImage: '/images/general/og-image.png',
},
```

These are written into `index.html` when the site builds, so search engines see
them straight away. `robots.txt` and `sitemap.xml` are generated from the same
`url` value — so setting `url` correctly is the one step you must not skip
before going live.

---

## Want a working contact form?

By default the contact section shows your email, LinkedIn and GitHub with a big
"Send me an email" button. That is perfectly good and needs no setup.

If you would rather have a message form:

1. Sign up for a free form service — [Formspree](https://formspree.io),
   [Web3Forms](https://web3forms.com) or [Getform](https://getform.io).
2. Create a form; it gives you an endpoint URL.
3. In the project folder, run `cp .env.example .env.local`.
4. Put the URL in `.env.local`:
   ```
   VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
   ```
5. Stop the dev server (Ctrl+C) and run `npm run dev` again.

The form appears automatically, with sending, success and error states already
handled.

**When you deploy:** add the same variable in your Vercel project settings
(Settings → Environment Variables). `.env.local` is never uploaded to GitHub.

> ⚠️ Anything starting with `VITE_` ends up inside the JavaScript your visitors
> download. Form endpoints are designed to be public, so that is fine. Never
> put a password, database URL or private API key there.
