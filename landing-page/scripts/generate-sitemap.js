const fs = require('fs');
const path = require('path');

function isoNow() { return new Date().toISOString(); }

function buildSitemapXml(siteUrl, posts) {
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/about`,
    `${siteUrl}/pricing`,
    `${siteUrl}/tools`,
    `${siteUrl}/blog`,
  ].map(u => ({ loc: u, lastmod: isoNow() }));

  const postUrls = posts.map(p => ({ loc: `${siteUrl}/blog/${p.slug}`, lastmod: p.date || isoNow() }));

  const all = urls.concat(postUrls);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    all.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n') +
    '\n</urlset>';

  return xml;
}

function readPosts(contentDir) {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  return files.map(f => {
    const raw = fs.readFileSync(path.join(contentDir, f), 'utf8');
    const match = raw.match(/date:\s*([0-9\-T:\.Z ]+)/i);
    const date = match ? match[1].trim() : null;
    const slug = f.replace(/\.mdx?$/, '');
    return { slug, date };
  });
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const contentDir = path.join(__dirname, '..', 'content', 'blog');
const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

const posts = readPosts(contentDir);
const xml = buildSitemapXml(siteUrl, posts);
fs.writeFileSync(outPath, xml);
console.log('Wrote sitemap.xml to public/ with', posts.length, 'posts');
