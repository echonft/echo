import { authRouteHandler } from '@echo/frontend/lib/request-handlers/auth-route-handler'
import { createOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/create-offer-request-handler'

export const PUT = authRouteHandler(createOfferRequestHandler)
