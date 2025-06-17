import { NextRequest, NextResponse } from 'next/server'

const requests = new Map<string, number[]>()

export function middleware(req: NextRequest) {
  if (req.method !== 'POST' || !req.nextUrl.pathname.startsWith('/send-mail')) {
    return NextResponse.next()
  }

  const ip =
  req.headers.get('x-real-ip') ??
  req.headers.get('x-forwarded-for')?.split(',')[0] ??
  'unknown'

  const now = Date.now()
  const timeframe = 60_000
  const maxRequests = 5

  const history = requests.get(ip) || []
  const recent = history.filter(t => now - t < timeframe)

  if (recent.length >= maxRequests) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  requests.set(ip, [...recent, now])
  return NextResponse.next()
}

export const config = {
  matcher: ['/send-mail'],
}
