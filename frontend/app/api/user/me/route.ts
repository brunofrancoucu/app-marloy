import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // 1. Extract all cookies from the incoming Next.js request
    const cookieStore = request.cookies
    const allCookies = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ')

    // 2. Forward the request to your FastAPI container
    // Note: We use 'backend:8000' because this runs server-side inside the Docker network
    const backendUrl = process.env.API_URL || 'http://backend:8000'

    const response = await fetch(`${backendUrl}/user/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Inject the exact cookies the browser sent us
        Cookie: allCookies,
      },
    })

    if (!response.ok) {
      // If FastAPI rejects the cookie, we relay the 401/403 status
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: response.status },
      )
    }

    // 3. Return the successful user data back to the browser
    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Next.js Proxy Error (/api/user/me):', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
