import { baseAuthConfig } from '@echo/backend/auth-config'
import { apiPathProvider } from '@echo/routing/constants/api-path-provider'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { baseUrl } from '@echo/routing/helpers/base-url'
import { isPathSecure } from '@echo/routing/path/is-path-secure'
import type { PathString } from '@echo/routing/types/path-string'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import NextAuth from 'next-auth'
import type { NextAuthRequest } from 'next-auth/lib'
import { NextResponse } from 'next/server'

type RouteHandler = (
  req: NextAuthRequest,
  ctx: {
    params?: Record<string, string | string[]>
  }
) => void | Response | Promise<void | Response>

const { auth } = NextAuth({
  ...baseAuthConfig,
  providers: []
})

export default auth((req: NextAuthRequest): void | Response | Promise<void | Response> => {
  const path = req.nextUrl.pathname as PathString
  if (apiPathProvider.ipfs.proxy.test(path)) {
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
  if (isPathSecure(path) && isNilOrEmpty(req.auth?.user)) {
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
