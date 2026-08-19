import { usePathname } from 'next/navigation'

// 1. Define your supported locales in one central place
export const locales = ['en', 'ru', 'es'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/**
 * Custom hook to safely extract the current validated language from the URL.
 * Only for use in Client Components.
 */
export function useCurrentLang(): Locale {
  const pathname = usePathname()

  if (!pathname) return defaultLocale

  // Extract the first path segment
  const segment = pathname.split('/')[1] as Locale

  // Robustness check: Ensure the segment is actually a supported language
  // If the segment is "dashboard" or missing, it falls back safely.
  if (locales.includes(segment)) {
    return segment
  }

  return defaultLocale
}
