'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import UserMenu from '../UserMenu'

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Ping your backend to see if the user's session cookie is valid
        // Adjust this endpoint to match whatever your FastAPI route is
        const response = await fetch('/api/user/me', {
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          setIsAuthenticated(true)
          setUserName(data.nombre || data.correo || 'Manager') // Pulls from your DB schema
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <nav className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 p-4 backdrop-blur-md sm:p-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="font-heading text-2xl font-black tracking-tight text-primary"
        >
          BrewBase.
        </Link>
        <div className="flex items-center gap-6 font-medium">
          <Link
            href="/inventory"
            className="hidden transition-colors hover:text-primary sm:block"
          >
            Inventory
          </Link>
          <Link
            href="/staff"
            className="hidden transition-colors hover:text-primary sm:block"
          >
            Staff
          </Link>

          {/* Conditional Auth Rendering */}
          {!isLoading &&
            (isAuthenticated ? (
              <UserMenu userName={userName} />
            ) : (
              <Link
                href="/login"
                scroll={false}
                className="rounded-lg bg-primary px-5 py-2.5 text-white transition-colors hover:bg-primary-hover"
              >
                Login
              </Link>
            ))}
        </div>
      </div>
    </nav>
  )
}
