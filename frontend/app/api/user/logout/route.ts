import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = 'http://backend:8000'

export async function POST(req: NextRequest) {
  const response = await fetch(`${BACKEND_URL}/user/logout`, {
    method: 'POST',
    headers: {
      Cookie: req.headers.get('cookie') ?? '',
    },
  })

  const data = await response.json()

  const res = NextResponse.json(data, {
    status: response.status,
  })

  const setCookie = response.headers.get('set-cookie')
  if (setCookie) {
    res.headers.set('set-cookie', setCookie)
  }

  return res
}
