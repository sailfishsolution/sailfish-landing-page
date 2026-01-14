import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function isoNow() { return new Date().toISOString(); }

function findContentDir() {
  const candidates = [
    path.join(process.cwd(), 'content', 'blog'),
    path.join(process.cwd(), 'landing-page', 'content', 'blog'),
    path.join(process.cwd(), '..', 'content', 'blog')
  ];
  return candidates.find(c => fs.existsSync(c));
}

function readPosts(contentDir: string) {
  if (!contentDir) return [];
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  return files.map(f => {
    const raw = fs.readFileSync(path.join(contentDir, f), 'utf8');
    const match = raw.match(/date:\s*([0-9\-T:\.Z ]+)/i);
    const date = match ? match[1].trim() : null;
    const slug = f.replace(/\.mdx?$/, '');
    return { slug, date };
  });
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const contentDir = findContentDir();

  const staticUrls = [
    `${siteUrl}/`,
    `${siteUrl}/about`,
    `${siteUrl}/pricing`,
    `${siteUrl}/tools`,
    `${siteUrl}/blog`,
  ];

  const posts = readPosts(contentDir || '');

  const urls = staticUrls.map(u => ({ loc: u, lastmod: isoNow() })).concat(
    posts.map(p => ({ loc: `${siteUrl}/blog/${p.slug}`, lastmod: p.date || isoNow() }))
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n') +
    '\n</urlset>';

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' }
  });
}
