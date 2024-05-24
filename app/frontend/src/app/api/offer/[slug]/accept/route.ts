import { authRouteHandler } from '@echo/frontend/lib/request-handlers/auth-route-handler'
import { acceptOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/accept-offer-request-handler'

export const POST = authRouteHandler(acceptOfferRequestHandler)
