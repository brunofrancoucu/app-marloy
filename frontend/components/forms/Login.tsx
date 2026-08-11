'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ correo: username, pwd_hash: password }),
      })

      if (response.ok) {
        // Option A: Stay on the current page and close the modal
        router.back()
        router.refresh()

        // Option B (What you had before): Go straight to the dashboard
        // router.push("/dashboard");
        // router.refresh();
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Invalid credentials. Please try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Network error. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
      {error && (
        <div className="rounded-xl border border-red-200/50 bg-red-50 p-4 text-sm font-medium text-red-600 dark:bg-red-950/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="username"
          className="text-sm font-semibold text-foreground/80"
        >
          Email Address
        </label>
        <input
          type="email"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-xl border border-foreground/10 bg-transparent p-3.5 text-foreground transition-all placeholder:text-foreground/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="manager@brewbase.com"
          required
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-foreground/80"
          >
            Password
          </label>
          <button
            type="button"
            className="text-xs font-medium text-primary hover:text-primary-hover"
          >
            Forgot password?
          </button>
        </div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-foreground/10 bg-transparent p-3.5 text-foreground transition-all placeholder:text-foreground/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 flex w-full justify-center rounded-xl bg-primary p-4 text-sm font-bold text-white transition-all hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      <p className="mt-4 text-center text-sm text-foreground/60">
        Don't have an account?{' '}
        <Link
          href="/signup"
          className="font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Sign up
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
