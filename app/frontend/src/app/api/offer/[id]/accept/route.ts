import { authAppRouteHandler } from '@echo/frontend/lib/request-handlers/auth-app-route-handler'
import { acceptOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/accept-offer-request-handler'

export const POST = authAppRouteHandler(acceptOfferRequestHandler)
