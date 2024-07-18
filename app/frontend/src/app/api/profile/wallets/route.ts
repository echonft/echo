import { authRequestHandler } from '@echo/frontend/lib/request-handlers/auth-request-handler'
import { getWalletsRequestHandler } from '@echo/frontend/lib/request-handlers/profile/get-wallets-request-handler'

export const GET = authRequestHandler(getWalletsRequestHandler)
