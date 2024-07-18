import { authRequestHandler } from '@echo/frontend/lib/request-handlers/auth-request-handler'
import { rejectOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/reject-offer-request-handler'

export const POST = authRequestHandler(rejectOfferRequestHandler)
