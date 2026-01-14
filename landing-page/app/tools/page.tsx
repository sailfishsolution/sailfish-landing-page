"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import tools from '../../config/tools'

// SaaS-style left panel focused on a single PAA tool (plugin-like UI)
export default function Tools() {
  const [active] = useState(tools[0]?.slug ?? 'paa-factory')

  const t = tools.find(x => x.slug === active)

  return (
    <section className="container mx-auto p-8">
      <div className="rounded-lg shadow overflow-hidden border bg-white">
        <div className="flex">
          <aside className="w-72 border-r bg-gray-50 h-[70vh]">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Installed Tools</h2>
            </div>
            <div className="p-3">
              <ul className="space-y-2">
                <li>
                  <div className="flex items-center gap-3 p-2 rounded bg-white shadow-sm">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded flex items-center justify-center font-bold">P</div>
                    <div>
                      <div className="font-medium">PAA Factory</div>
                      <div className="text-xs text-gray-500">AI for People Also Ask</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="p-3 border-t text-sm text-gray-600">
              <div>Version: alpha</div>
            </div>
          </aside>

          <main className="flex-1 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold">{t?.title}</h3>
                <p className="mt-2 text-gray-700">{t?.description}</p>
              </div>
              <div className="space-x-2">
                <Link href="/tools/paa-factory" className="px-4 py-2 bg-blue-600 text-white rounded">Open Tool</Link>
                <button className="px-4 py-2 border rounded">Request Access</button>
              </div>
            </div>

            <section className="mt-6 bg-white border rounded p-4 shadow-sm">
              <h4 className="font-semibold">Overview</h4>
              <p className="mt-2 text-sm text-gray-600">PAA Factory will analyze pages and generate People Also Ask suggestions. Integration will be added in phase 2.</p>
            </section>

            <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded bg-gray-50">
                <h5 className="font-semibold">Settings</h5>
                <p className="text-sm text-gray-600 mt-2">Configure model, API keys, and limits (coming soon).</p>
              </div>
              <div className="p-4 border rounded bg-gray-50">
                <h5 className="font-semibold">Logs & Activity</h5>
                <p className="text-sm text-gray-600 mt-2">Task history and usage metrics will appear here.</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </section>
  )
}
