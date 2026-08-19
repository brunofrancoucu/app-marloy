'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAppStore } from '@/store'
import { useShallow } from 'zustand/shallow'
import { useCurrentLang } from '@/lib/services/language/hooks'

export default function LoginForm({ dict }: { dict: any }) {
  const [user, setUser] = useAppStore(
    useShallow((state) => [state.user, state.setUser]),
  )
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const lang = useCurrentLang()

  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: username, pwd_hash: password }),
      })

      if (response.ok) {
        setUser({ email: username })
        const redirectUrl = searchParams.get('redirect')

        if (redirectUrl) {
          router.push(redirectUrl)
        } else {
          router.back()
        }
      } else {
        setUser(null)
        const errorData = await response.json()
        // Use dictionary fallback if API doesn't provide a specific error message
        setError(errorData.error || dict.err_invalid)
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(dict.err_network)
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
          {dict.email_label}
        </label>
        <input
          type="email"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-xl border border-foreground/10 bg-transparent p-3.5 text-foreground transition-all placeholder:text-foreground/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder={dict.email_placeholder}
          required
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-foreground/80"
          >
            {dict.password_label}
          </label>
          <button
            type="button"
            className="text-xs font-medium text-primary hover:text-primary-hover"
          >
            {dict.forgot_password}
          </button>
        </div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-foreground/10 bg-transparent p-3.5 text-foreground transition-all placeholder:text-foreground/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder={dict.password_placeholder}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 flex w-full justify-center rounded-xl bg-primary p-4 text-sm font-bold text-white transition-all hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? dict.btn_loading : dict.btn_submit}
      </button>

      <p className="mt-4 text-center text-sm text-foreground/60">
        {dict.no_account}{' '}
        <Link
          href={`/${lang}/signup`}
          className="font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          {dict.sign_up_link}
        </Link>
      </p>
    </form>
  )
}
