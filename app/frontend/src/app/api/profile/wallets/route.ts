import { authRouteHandler } from '@echo/frontend/lib/request-handlers/auth-route-handler'
import { getWalletsRequestHandler } from '@echo/frontend/lib/request-handlers/profile/get-wallets-request-handler'

export const GET = authRouteHandler(getWalletsRequestHandler)
