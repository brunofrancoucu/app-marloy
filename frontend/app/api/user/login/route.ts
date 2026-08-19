import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = 'http://backend:8000'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const response = await fetch(`${BACKEND_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  const res = NextResponse.json(data, {
    status: response.status,
  })

  // Forward cookies set by the backend
  const setCookie = response.headers.get('set-cookie')
  if (setCookie) {
    res.headers.set('set-cookie', setCookie)
  }

  return res
}
