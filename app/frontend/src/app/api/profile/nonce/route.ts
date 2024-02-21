import { authRouteHandler } from '@echo/frontend/lib/request-handlers/auth-route-handler'
import { nonceRequestHandler } from '@echo/frontend/lib/request-handlers/profile/nonce-request-handler'

export const GET = authRouteHandler(nonceRequestHandler)
