import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 mt-12">
      <div className="container mx-auto p-6 text-sm text-gray-600">
        © {new Date().getFullYear()} Sailfish Solution — All rights reserved.
      </div>
    </footer>
  )
}
