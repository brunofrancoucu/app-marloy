'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Adjust this endpoint to match your FastAPI signup route
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: email,
          pwd_hash: password,
          es_administrador: false,
        }),
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
        setError(errorData.error || 'Signup failed. Please try again.')
      }
    } catch (err) {
      console.error('Signup error:', err)
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
          htmlFor="email"
          className="text-sm font-semibold text-foreground/80"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-foreground/10 bg-transparent p-3.5 text-foreground transition-all placeholder:text-foreground/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="manager@brewbase.com"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-foreground/80"
        >
          Create Password
        </label>
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
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="mt-4 text-center text-sm text-foreground/60">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}

export default SignupForm
