'use client'

import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppStore } from '@/store'
import { useShallow } from 'zustand/shallow'

export default function UserMenu({
  userName = 'Manager',
}: {
  userName?: string
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [isOpen, setIsOpen, setUser] = useAppStore(
    useShallow((state) => [
      state.settings.isMenuOpen,
      state.setSetting,
      state.setUser,
    ]),
  )

  // Close dropdown if clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen('isMenuOpen', false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      // Assuming you have a logout endpoint to clear the HTTP-only cookie
      await fetch('/api/user/logout', {
        method: 'POST',
        credentials: 'include',
      })

      setIsOpen('isMenuOpen', false)
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen('isMenuOpen', !isOpen)}
        className="flex items-center gap-2 rounded-full border border-foreground/10 bg-background p-1 pr-3 transition-colors hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-semibold text-foreground">
          {userName}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-foreground/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-1">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen('isMenuOpen', false)}
              className="block rounded-lg px-4 py-2 text-sm text-foreground hover:bg-foreground/5"
            >
              Dashboard
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen('isMenuOpen', false)}
              className="block rounded-lg px-4 py-2 text-sm text-foreground hover:bg-foreground/5"
            >
              Account Settings
            </Link>
            <div className="my-1 border-t border-foreground/10"></div>
            <button
              onClick={handleLogout}
              className="block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
