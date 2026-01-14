"use client"
import React, { useState } from 'react'

export default function Tabs({ items }: { items: { key: string, title: string, content: React.ReactNode }[] }) {
  const [active, setActive] = useState(items[0]?.key ?? '')

  return (
    <div>
      <div className="flex space-x-2">
        {items.map(i => (
          <button key={i.key} onClick={() => setActive(i.key)} className={`px-3 py-1 rounded ${active === i.key ? 'bg-gray-200' : 'bg-transparent'}`}>
            {i.title}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {items.map(i => active === i.key ? <div key={i.key}>{i.content}</div> : null)}
      </div>
    </div>
  )
}
