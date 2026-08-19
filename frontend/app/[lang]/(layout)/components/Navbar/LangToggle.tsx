'use client'

import { useRef, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation' // 1. Add useSearchParams

export default function LangToggle({ currentLang }: { currentLang: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()
  const searchParams = useSearchParams() // 2. Extract the search parameters
  const router = useRouter()

  // Close dropdown if clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLanguage = (newLang: string) => {
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`

    if (pathname) {
      const segments = pathname.split('/')
      segments[1] = newLang
      const newPath = segments.join('/')

      // 3. Reconstruct the query string to protect the ?redirect= parameters
      const query = searchParams.toString()
      const finalUrl = query ? `${newPath}?${query}` : newPath

      window.location.href = finalUrl // fix: bug at /[]/login lang change router.push(finalUrl)
    }

    setIsOpen(false)
  }

  // Your supported languages
  const locales = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'es', label: 'ES' },
  ]

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-foreground/80 transition-colors hover:bg-foreground/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Change Language"
      >
        {currentLang.toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 mt-2 w-24 origin-top-right overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-1">
            {locales.map((locale) => (
              <button
                key={locale.code}
                onClick={() => switchLanguage(locale.code)}
                className={`block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors hover:bg-foreground/5 ${
                  currentLang === locale.code
                    ? 'font-bold text-primary'
                    : 'text-foreground'
                }`}
              >
                {locale.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
