import { authRouteHandler } from '@echo/frontend/lib/request-handlers/auth-route-handler'
import { cancelOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/cancel-offer-request-handler'

export const POST = authRouteHandler(cancelOfferRequestHandler)
