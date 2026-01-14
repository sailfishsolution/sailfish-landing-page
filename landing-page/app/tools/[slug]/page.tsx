import React from 'react'
import tools from '../../../config/tools'
import { notFound } from 'next/navigation'

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find(t => t.slug === params.slug)
  if (!tool) return notFound()

  return (
    <section className="container mx-auto p-8">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{tool.title}</h1>
          <div className="text-sm text-gray-500">Plugin-style panel</div>
        </div>
        <p className="mt-4 text-gray-700">{tool.description}</p>
        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Open PAA Factory</button>
        </div>
        <section className="mt-6">
          <h2 className="text-lg font-semibold">About this tool</h2>
          <p className="mt-2 text-sm text-gray-600">This route is prepared for the PAA Factory tool; the actual tool UI will mount here when implemented.</p>
        </section>
      </div>
    </section>
  )
}
