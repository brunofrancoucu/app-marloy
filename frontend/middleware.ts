import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
// import { useSearchParams } from "next/navigation"
// import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "your-secret"

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get("jwtToken")?.value
  // const searchParams = useSearchParams()
  // console.log("Intended route param", searchParams.get("redirect"))

  if (!token) {
    return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(req.nextUrl.pathname)}`, req.url))
  }

  try {
    // try: validate jwt
    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
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
    "/((?!api|_next|_static|favicon.ico|login).*)",
  ],
}
