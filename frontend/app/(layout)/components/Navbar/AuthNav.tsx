/* Right side of nav bar */
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { useAppStore } from '@/store'
import { useShallow } from 'zustand/shallow'

export default function AuthNav() {
  const [user, setUser] = useAppStore(
    useShallow((state) => [state.user, state.setUser]),
  )
  const [isLoading, setIsLoading] = useState(true)

  console.log(user)

  // 1. Hydrate Zustand on initial app load
  useEffect(() => {
    const initAuth = async () => {
      if (user) return // Prevent duplicate checks if navigating around

      try {
        // Ping the Next.js API route that securely forwards the cookie to FastAPI
        const res = await fetch('/api/user/me')

        if (res.ok) {
          const data = await res.json()
          setUser({ email: data.correo }) // Populate Zustand with the database result
        }
      } catch (error) {
        console.error('Initial auth check failed:', error)
      } finally {
        // setAuthLoaded(true) // Always mark as loaded, even if it failed
      }
    }

    initAuth()
  }, [user, setUser])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Ping your backend to see if the user's session cookie is valid
        // Adjust this endpoint to match whatever your FastAPI route is
        const response = await fetch('/api/user/me', {
          credentials: 'include',
        })
      } catch (error) {
        // setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <>
      {!isLoading &&
        (user ? (
          <UserMenu userName={user.email} />
        ) : (
          <Link
            href="/login?redirect=%2Fdashboard"
            scroll={false}
            className="rounded-lg bg-primary px-5 py-2.5 text-white transition-colors hover:bg-primary-hover"
          >
            Login
          </Link>
        ))}
    </>
  )
}
