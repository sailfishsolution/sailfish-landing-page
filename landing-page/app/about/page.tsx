import React from 'react'

export default function About() {
  return (
    <section className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">About Sailfish Solution</h1>
      <p className="mt-4">We build developer-first AI SEO tools focused on performance and trust.</p>
      <article className="mt-6">
        <h2 className="text-2xl">Team</h2>
        <ul className="mt-2 list-disc pl-6">
          <li><strong>Alex Roe</strong> — Founder & AI Engineer (fictional)</li>
          <li><strong>Sam Lin</strong> — SEO Lead (fictional)</li>
        </ul>
      </article>
    </section>
  )
}
