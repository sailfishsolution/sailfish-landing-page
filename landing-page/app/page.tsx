import React from 'react'

export default function Home() {
  return (
    <section className="container mx-auto p-8">
      <header className="py-12">
        <h1 className="text-4xl font-bold">Unlock AI-Powered SEO Mastery with Sailfish Solution</h1>
        <p className="mt-4 text-lg">Fast, smart tools for developers—coming soon.</p>
        <div className="mt-6 space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Join Waitlist</button>
          <a href="/tools" className="px-4 py-2 border rounded">Explore Tools</a>
        </div>
      </header>
      <section>
        <h2 className="text-2xl font-semibold">Tools (Placeholders)</h2>
        <p className="mt-2">PAA Factory, Schema Gen — coming soon. See the Tools page for tabs.</p>
      </section>
    </section>
  )
}
