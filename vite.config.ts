import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';
import { projects } from './src/data/projects.ts';
import { siteConfig } from './src/data/site.ts';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const baseUrl = siteConfig.seo.url.replace(/\/$/, '');

function seoPlugin(): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml() {
      const { seo, name, links } = siteConfig;
      const ogImage = `${baseUrl}${seo.ogImage}`;

      /* Only links that are actually filled in are included in sameAs. */
      const sameAs = [links.github, links.linkedin, links.twitter].filter(
        (url) => url && !/_HERE/i.test(url),
      );

      const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name,
        url: baseUrl,
        jobTitle: seo.jobTitle,
        description: seo.description,
        ...(sameAs.length > 0 ? { sameAs } : {}),
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Amity University Rajasthan',
        },
        knowsAbout: seo.keywords,
      };

      return [
        { tag: 'title', children: seo.title, injectTo: 'head' },
        {
          tag: 'meta',
          attrs: { name: 'description', content: seo.description },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { name: 'keywords', content: seo.keywords.join(', ') },
          injectTo: 'head',
        },
        { tag: 'meta', attrs: { name: 'author', content: name }, injectTo: 'head' },
        { tag: 'link', attrs: { rel: 'canonical', href: baseUrl }, injectTo: 'head' },

        {
          tag: 'meta',
          attrs: { property: 'og:type', content: 'website' },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { property: 'og:site_name', content: name },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { property: 'og:title', content: seo.title },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { property: 'og:description', content: seo.description },
          injectTo: 'head',
        },
        { tag: 'meta', attrs: { property: 'og:url', content: baseUrl }, injectTo: 'head' },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: ogImage },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:alt', content: `${name} — portfolio` },
          injectTo: 'head',
        },

        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:title', content: seo.title },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:description', content: seo.description },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: ogImage },
          injectTo: 'head',
        },
        ...(seo.twitterHandle
          ? [
              {
                tag: 'meta',
                attrs: { name: 'twitter:creator', content: seo.twitterHandle },
                injectTo: 'head' as const,
              },
            ]
          : []),

        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(personSchema),
          injectTo: 'head',
        },
      ];
    },
  };
}

function filesPlugin(): Plugin {
  return {
    name: 'portfolio-seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().split('T')[0];

      const urls = [
        { loc: baseUrl, priority: '1.0' },
        ...projects.map((project) => ({
          loc: `${baseUrl}/projects/${project.slug}`,
          priority: '0.8',
        })),
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) =>
      `  <url>\n    <loc>${escapeHtml(loc)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

      const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin(), filesPlugin()],
  build: {
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        /* Keep React and the router in their own file. They change far less
           often than your content, so returning visitors reuse the cached copy
           even after you edit a project. */
        manualChunks(id: string) {
          if (
            /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(
              id,
            )
          ) {
            return 'react-vendor';
          }
          return undefined;
        },
      },
    },
  },
});
