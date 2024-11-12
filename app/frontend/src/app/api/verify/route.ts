import { requestHandler } from '@echo/backend/request-handlers/request-handler'
import { verifyRequestHandler } from '@echo/backend/request-handlers/verify/verify-request-handler'

export const GET = requestHandler(verifyRequestHandler)
