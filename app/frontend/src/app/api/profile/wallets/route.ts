import { authRequestHandler } from '@echo/backend/request-handlers/auth-request-handler'
import { getWalletsRequestHandler } from '@echo/backend/request-handlers/profile/get-wallets-request-handler'

export const GET = authRequestHandler(getWalletsRequestHandler)
