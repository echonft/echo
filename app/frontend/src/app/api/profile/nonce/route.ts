import { authRequestHandler } from '@echo/frontend/lib/request-handlers/auth-request-handler'
import { nonceRequestHandler } from '@echo/frontend/lib/request-handlers/profile/nonce-request-handler'

export const GET = authRequestHandler(nonceRequestHandler)
