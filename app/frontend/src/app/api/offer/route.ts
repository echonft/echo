import { authAppRouteHandler } from '@echo/frontend/lib/server/request-handlers/auth-app-route-handler'
import { createOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/create-offer-request-handler'

export const PUT = authAppRouteHandler(createOfferRequestHandler)
