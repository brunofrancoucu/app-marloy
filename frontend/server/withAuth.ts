import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import { cookies } from 'next/headers'
import type { MiddlewareFactory } from './factory'
export const withAuth: MiddlewareFactory = (next) => {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname
    const isProtectedRoute = pathname.includes('/dashboard')

    if (isProtectedRoute) {
      const cookieStore = await cookies()
      const token = cookieStore.get('jwtToken')?.value

      // Extract the current locale (e.g., "en" from "/en/dashboard")
      const currentLocale = pathname.split('/')[1] || 'en'

      if (!token) {
        return NextResponse.redirect(
          // Prefix the redirect URL with the locale
          new URL(
            `/${currentLocale}/login?redirect=${encodeURIComponent(pathname)}`,
            req.url,
          ),
        )
      }

      try {
        // validate jwt
      } catch (err) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/login`, req.url),
        )
      }
    }

    return next(req, event)
  }
}
