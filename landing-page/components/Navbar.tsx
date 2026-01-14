"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white dark:bg-transparent">
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center justify-center">
              <Image
                src="/images/logo.svg"
                alt="Sailfish logo"
                width={210}
                height={210}
                priority
                className="block"
              />
            </Link>
          </div>

          <nav className="mt-3 w-full">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-700">
              <Link href="/tools" className="hover:text-blue-600">Tools</Link>
              <Link href="/about" className="hover:text-blue-600">About</Link>
              <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
              <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
    </header>
  )
}
