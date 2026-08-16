/* Right side of nav bar */
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { useAppStore } from '@/store'

export default function AuthNav() {
  const user = useAppStore((state) => state.user)
  const [isLoading, setIsLoading] = useState(true)

  console.log(user)

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
