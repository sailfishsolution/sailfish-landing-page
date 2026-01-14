import React from 'react'
import fs from 'fs'
import path from 'path'

type PostMeta = {
  slug: string
  title: string
  date?: string
  description?: string
}

function parseFrontmatter(content: string) {
  const fm = /^---\n([\s\S]*?)\n---/m.exec(content)
  if (!fm) return {}
  const lines = fm[1].split('\n')
  const meta: Record<string, string> = {}
  for (const line of lines) {
    const m = /^([a-zA-Z0-9_\-]+):\s*"?([^"]+)"?\s*$/.exec(line)
    if (m) meta[m[1]] = m[2]
  }
  return meta
}

export default function Blog() {
  const candidateDirs = [
    path.join(process.cwd(), 'content', 'blog'),
    path.join(process.cwd(), 'landing-page', 'content', 'blog')
  ]
  const postsDir = candidateDirs.find(d => fs.existsSync(d)) || path.join(process.cwd(), 'content', 'blog')
  let files: string[] = []
  try { files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx')) } catch (e) { }

  const posts: PostMeta[] = files.map(f => {
    const slug = f.replace(/\.mdx$/, '')
    try {
      const content = fs.readFileSync(path.join(postsDir, f), 'utf-8')
      const meta = parseFrontmatter(content)
      return {
        slug,
        title: meta.title || slug,
        date: meta.date,
        description: meta.description,
      }
    } catch (e) {
      return { slug, title: slug }
    }
  }).sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date)
    if (a.date) return -1
    if (b.date) return 1
    return 0
  })

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="grid gap-6">
            {posts.length === 0 && <div className="text-gray-600">No posts yet. Drop `.mdx` files in `content/blog/`.</div>}
            {posts.map(p => (
              <a key={p.slug} href={`/blog/${p.slug}`} className="block p-6 border rounded-lg hover:shadow transition">
                <div className="flex items-baseline justify-between">
                  <h2 className="text-2xl font-semibold">{p.title}</h2>
                  {p.date && <time className="text-sm text-gray-500">{p.date}</time>}
                </div>
                {p.description && <p className="mt-3 text-gray-600">{p.description}</p>}
                <div className="mt-4 text-sm text-blue-600">Read article →</div>
              </a>
            ))}
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-4">Recent articles</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {posts.map(p => (
                <li key={p.slug} className="flex justify-between items-center">
                  <a href={`/blog/${p.slug}`} className="hover:underline">{p.title}</a>
                  {p.date && <span className="text-xs text-gray-500 ml-2">{p.date}</span>}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  )
}
