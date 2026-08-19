import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'
// import jwt from "jsonwebtoken"

import { withAuth } from './server/withAuth'
import { withLang } from './server/withLang'

// 2. Build the factory chain
const composedMiddleware = [withLang, withAuth].reduceRight(
  // 3. Explicitly type the fallback to satisfy strict TypeScript inference
  (nextMiddleware, middlewareFactory) => middlewareFactory(nextMiddleware),
  ((req: NextRequest, event: NextFetchEvent) =>
    NextResponse.next()) as NextMiddleware,
)

// 4. Export the standard Next.js middleware signature
export function middleware(req: NextRequest, event: NextFetchEvent) {
  return composedMiddleware(req, event)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     * 5. /login route
     */
    '/((?!api|_next|_static|favicon.ico).*)',
  ],
}
