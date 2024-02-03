import { authAppRouteHandler } from '@echo/frontend/lib/request-handlers/auth-app-route-handler'
import { getWalletsRequestHandler } from '@echo/frontend/lib/request-handlers/profile/get-wallets-request-handler'

export const GET = authAppRouteHandler(getWalletsRequestHandler)
