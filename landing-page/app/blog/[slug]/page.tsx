import React from 'react'
import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { marked } from 'marked'

export default function Post({ params }: { params: { slug: string } }) {
  const candidateDirs = [
    path.join(process.cwd(), 'content', 'blog'),
    path.join(process.cwd(), 'landing-page', 'content', 'blog')
  ]
  const postsDir = candidateDirs.find(d => fs.existsSync(d)) || path.join(process.cwd(), 'content', 'blog')
  const postPath = path.join(postsDir, `${params.slug}.mdx`)
  if (!fs.existsSync(postPath)) return notFound()

  const raw = fs.readFileSync(postPath, 'utf-8')
  // strip YAML frontmatter if present
  const bodyMd = raw.replace(/^---\n[\s\S]*?\n---\n/m, '').trim()
  let html = marked.parse(bodyMd)
  // add useful classes to images for responsive layout if none present
  html = html.replace(/<img(?![^>]*class=)([^>]*)>/g, '<img$1 class="w-full h-auto rounded-md" />')

  // try to extract simple frontmatter for SEO (title/date)
  const fm = /^---\n([\s\S]*?)\n---/m.exec(raw)
  const meta: Record<string, string> = {}
  if (fm) {
    for (const line of fm[1].split('\n')) {
      const m = /^([a-zA-Z0-9_\-]+):\s*"?([^"]+)"?\s*$/.exec(line)
      if (m) meta[m[1]] = m[2]
    }
  }

  const title = meta.title || params.slug.replace(/[-_]/g, ' ')
  const date = meta.date

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    datePublished: date || undefined,
    author: { '@type': 'Organization', name: 'Sailfish Solution' }
  }

  return (
    <article className="container mx-auto p-8">
      <header>
        <h1 className="text-3xl font-bold">{title}</h1>
        {date && <time className="text-sm text-gray-500">{date}</time>}
      </header>
      <div className="mt-6 max-w-3xl mx-auto">
        <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  )
}
