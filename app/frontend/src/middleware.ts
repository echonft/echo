import { pathProvider } from '@echo/routing/constants/path-provider'
import { baseUrl } from '@echo/routing/helpers/base-url'
import { isApiPath } from '@echo/routing/path/is-api-path'
import { isApiPathSecure } from '@echo/routing/path/is-api-path-secure'
import { isApiWebhookPath } from '@echo/routing/path/is-api-webhook-path'
import { isPathSecure } from '@echo/routing/path/is-path-secure'
import type { PathString } from '@echo/routing/types/path-string'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { pathIsNil } from '@echo/utils/helpers/path-is-nil'
import { propIsNil } from '@echo/utils/helpers/prop-is-nil'
import NextAuth from 'next-auth'
import type { NextAuthRequest } from 'next-auth/lib'
import { NextResponse } from 'next/server'
import { assoc, dissoc, either, isNil } from 'ramda'

type RouteHandler = (
  req: NextAuthRequest,
  ctx: {
    params?: Record<string, string | string[]>
  }
) => void | Response | Promise<void | Response>

const { auth } = NextAuth({
  callbacks: {
    jwt: function ({ token, user }) {
      if (!isNil(user)) {
        return assoc('user', dissoc('id', user), token)
      }
      return token
    },
    session: function (params) {
      const {
        session,
        token: { user }
      } = params
      if (either(propIsNil('token'), pathIsNil(['token', 'user']))(params)) {
        return session
      }
      return assoc('user', user, session)
    }
  },
  pages: {
    signIn: '/login'
  },
  providers: []
})
export default auth((req): void | Response | Promise<void | Response> => {
  const path = req.nextUrl.pathname as PathString
  console.log(`--------- MIDDLEWARE --------`)
  console.log(`auth ${JSON.stringify(auth)}`)
  if (isApiPath(path)) {
    if (isApiPathSecure(path) && isNilOrEmpty(req.auth?.user)) {
      return NextResponse.json('unauthorized', { status: 401 })
    }
    if (!isApiWebhookPath(path)) {
      // set CORS headers
      const allowedOrigins = [baseUrl]
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
