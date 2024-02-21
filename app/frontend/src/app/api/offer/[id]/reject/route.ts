import { authRouteHandler } from '@echo/frontend/lib/request-handlers/auth-route-handler'
import { rejectOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/reject-offer-request-handler'

export const POST = authRouteHandler(rejectOfferRequestHandler)
