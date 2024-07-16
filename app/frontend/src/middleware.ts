import { isApiPath } from '@echo/api/routing/api/is-api-path'
import { isApiPathSecure } from '@echo/api/routing/api/is-api-path-secure'
import { isApiWebhookPath } from '@echo/api/routing/api/is-api-webhook-path'
import { isPathSecure } from '@echo/api/routing/is-path-secure'
import { pathProvider } from '@echo/api/routing/path-provider'
import { auth } from '@echo/auth/auth'
import { UnauthorizedError } from '@echo/frontend/lib/helpers/error/unauthorized-error'
import { getBaseUrl } from '@echo/utils/helpers/get-base-url'
import type { AppRouteHandlerFn } from 'next/dist/server/future/route-modules/app-route/module'
import { NextResponse } from 'next/server'
import { isNil } from 'ramda'

export default auth((req): void | Response | Promise<void | Response> => {
  const path = req.nextUrl.pathname
  if (isApiPath(path)) {
    if (isApiPathSecure(path) && isNil(req.auth?.user)) {
      return new UnauthorizedError().getErrorResponse()
    }
    if (!isApiWebhookPath(path)) {
      // set CORS headers
      const allowedOrigins = [getBaseUrl()]
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
}) as AppRouteHandlerFn

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
