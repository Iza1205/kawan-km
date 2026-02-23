'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getYears } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [yearDropdown, setYearDropdown] = useState(false)
  const years = getYears()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg shadow-blue-900/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md shadow-blue-200 group-hover:scale-105 transition-transform">
              <span className="text-white font-display font-bold text-sm">K</span>
            </div>
            <div>
              <span className="font-display font-bold text-forest-800 text-lg leading-none block">KawanPPM</span>
              <span className="text-xs text-sage-500 font-body leading-none">Koleksi Video Internal</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-forest-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              Home
            </Link>

            {/* Kategori Tahun Dropdown */}
            <div className="relative" onMouseEnter={() => setYearDropdown(true)} onMouseLeave={() => setYearDropdown(false)}>
              <button className="px-4 py-2 text-sm font-medium text-forest-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-1.5">
                Kategori Tahun
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${yearDropdown ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {yearDropdown && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl shadow-blue-900/10 border border-blue-100 p-2 grid grid-cols-3 gap-1">
                  {years.map((year) => (
                    <Link
                      key={year}
                      href={`/koleksi/${year}`}
                      className="px-3 py-2 text-sm text-center font-medium text-forest-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all"
                    >
                      {year}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-forest-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              Contact
            </Link>

            <Link
              href="/admin"
              className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl hover:from-blue-800 hover:to-blue-600 transition-all shadow-md shadow-blue-200"
            >
              Admin ↗
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-forest-700 hover:bg-blue-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-blue-100 bg-white/95 backdrop-blur-sm rounded-b-2xl shadow-lg pb-4">
            <div className="px-4 py-3 space-y-1">
              <Link href="/" className="block px-3 py-2.5 text-sm font-medium text-forest-700 hover:bg-blue-50 rounded-lg">Home</Link>
              <div className="px-3 py-2 text-xs font-semibold text-sage-400 uppercase tracking-wider">Kategori Tahun</div>
              <div className="grid grid-cols-4 gap-1 px-2">
                {years.map((year) => (
                  <Link
                    key={year}
                    href={`/koleksi/${year}`}
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-1.5 text-sm text-center font-medium text-forest-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all"
                  >
                    {year}
                  </Link>
                ))}
              </div>
              <Link href="/contact" className="block px-3 py-2.5 text-sm font-medium text-forest-700 hover:bg-blue-50 rounded-lg">Contact</Link>
              <Link href="/admin" className="block px-3 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl text-center">Admin ↗</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
