import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import type { MiddlewareFactory } from './factory'

const locales = ['en', 'ru', 'es']
const defaultLocale = 'en'

function getLocale(req: NextRequest) {
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale

  const acceptLanguage = req.headers.get('accept-language')
  if (acceptLanguage) {
    const browserLangs = acceptLanguage.split(',')
    for (const lang of browserLangs) {
      const langCode = lang.split(';')[0].split('-')[0].trim().toLowerCase()
      if (locales.includes(langCode)) return langCode
    }
  }
  return defaultLocale
}

export const withLang: MiddlewareFactory = (next) => {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const { pathname } = req.nextUrl

    const pathnameHasLocale = locales.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    )

    // 1. If no language exists, redirect. This halts the chain.
    if (!pathnameHasLocale) {
      const locale = getLocale(req)
      req.nextUrl.pathname = `/${locale}${pathname}`
      return NextResponse.redirect(req.nextUrl)
    }

    // 2. If language exists, proceed to the next middleware (withAuth)
    return next(req, event)
  }
}
