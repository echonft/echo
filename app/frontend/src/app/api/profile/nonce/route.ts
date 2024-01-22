import { authAppRouteHandler } from '@echo/frontend/lib/request-handlers/auth-app-route-handler'
import { nonceRequestHandler } from '@echo/frontend/lib/request-handlers/user/nonce-request-handler'

export const GET = authAppRouteHandler(nonceRequestHandler)
