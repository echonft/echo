import { baseAuthConfig } from '@echo/backend/auth/auth-config'
import { apiRoutes } from '@echo/routing/constants/api-routes'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { baseUrl } from '@echo/routing/helpers/base-url'
import { frontendRouteMatch } from '@echo/routing/helpers/frontend/frontend-route-match'
import type { Path } from '@echo/routing/types/path'
import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import NextAuth from 'next-auth'
import type { NextAuthRequest } from 'next-auth/lib'
import { NextResponse } from 'next/server'
import { isNil } from 'ramda'

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

function isSecureFrontendPath(path: Path) {
  const route = frontendRouteMatch(path)
  if (isNil(route)) {
    return false
  }
  return route.secure
}

export default auth((request: NextAuthRequest): void | Response | Promise<void | Response> => {
  const path = request.nextUrl.pathname as Path
  if (apiRoutes.ipfs.proxy.test(path)) {
    // set CORS headers
    const allowedOrigins = [baseUrl()]
    const corsOptions = {
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
    // Check the origin from the request
    const origin = request.headers.get('origin') ?? ''
    const isAllowedOrigin = allowedOrigins.includes(origin)
    // Handle preflighted requests
    const isPreflight = request.method === 'OPTIONS'
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
  if (isSecureFrontendPath(path) && isNilOrEmpty(request.auth?.user)) {
    // Redirect to login page
    const response = NextResponse.redirect(frontendRoutes.login.wallet.getUrl())
    response.cookies.set('callbackPath', request.nextUrl.href, {
      httpOnly: false,
      secure: nodeEnvironment() === NodeEnvironment.Production,
      sameSite: 'lax'
    })
    return response
  }
}) as RouteHandler

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|instrumentation|favicon.ico|manifest.webmanifest|icon(?:-\\d+x\\d+)?\\.png).*)'
  ]
}
