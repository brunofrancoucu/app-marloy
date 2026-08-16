'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, MouseEvent } from 'react'

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // const onDismiss = useCallback(() => {
  //   router.back()
  // }, [router])
  const onDismiss = () => {
    router.back()
  }

  const onClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        onDismiss()
      }
    },
    [onDismiss, overlay, wrapper],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss],
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-md transition-opacity"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="relative w-full max-w-md transform overflow-hidden rounded-3xl border border-foreground/10 bg-background p-8 text-left align-middle shadow-2xl transition-all"
      >
        <button
          onClick={onDismiss}
          className="absolute right-6 top-6 rounded-full p-2 text-foreground/40 transition-colors hover:bg-foreground/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {children}
      </div>
    </div>
  )
}
