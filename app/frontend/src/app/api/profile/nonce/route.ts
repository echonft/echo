import { authRequestHandler } from '@echo/backend/request-handlers/auth-request-handler'
import { nonceRequestHandler } from '@echo/backend/request-handlers/profile/nonce-request-handler'

export const GET = authRequestHandler(nonceRequestHandler)
