import { authRequestHandler } from '@echo/backend/request-handlers/auth-request-handler'
import { rejectOfferRequestHandler } from '@echo/backend/request-handlers/offer/reject-offer-request-handler'

export const POST = authRequestHandler(rejectOfferRequestHandler)
