import { auth } from '@echo/auth/auth'
import type { NextAuthRequest } from '@echo/auth/types/next-auth-request'
import { UnauthorizedError } from '@echo/backend/errors/unauthorized-error'
import { baseUrl } from '@echo/routing/helpers/base-url'
import { isApiPath } from '@echo/routing/path/is-api-path'
import { isApiPathSecure } from '@echo/routing/path/is-api-path-secure'
import { isApiWebhookPath } from '@echo/routing/path/is-api-webhook-path'
import { isPathSecure } from '@echo/routing/path/is-path-secure'
import { pathProvider } from '@echo/routing/path/path-provider'
import { NextResponse } from 'next/server'
import { isNil } from 'ramda'

type RouteHandler = (
  req: NextAuthRequest,
  ctx: {
    params?: Record<string, string | string[]>
  }
) => void | Response | Promise<void | Response>

export default auth((req): void | Response | Promise<void | Response> => {
  const path = req.nextUrl.pathname
  if (isApiPath(path)) {
    if (isApiPathSecure(path) && isNil(req.auth?.user)) {
      return new UnauthorizedError().getErrorResponse()
    }
    if (!isApiWebhookPath(path)) {
      // set CORS headers
      const allowedOrigins = [baseUrl()]
      const corsOptions = {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
      // Check the origin from the request
      const origin = req.headers.get('origin') ?? ''
      const isAllowedOrigin = allowedOrigins.includes(origin)
      // Handle preflighted requests
      const isPreflight = req.method === 'OPTIONS'
      if (isPreflight) {
        const preflightHeaders = {
          ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
          ...corsOptions
        }
        return NextResponse.json({}, { headers: preflightHeaders })
      }
      // Handle simple requests
      const response = NextResponse.next()
      if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin)
      }
      Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value)
      })
      return response
    }
  }
  if (isPathSecure(path) && isNil(req.auth?.user)) {
    // Redirect to login page
    const signInUrl = req.nextUrl.clone()
    signInUrl.pathname = pathProvider.auth.signIn.get()
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.href)
    return NextResponse.redirect(signInUrl)
  }
}) as RouteHandler

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
