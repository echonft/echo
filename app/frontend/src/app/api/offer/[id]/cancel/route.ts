import { authAppRouteHandler } from '@echo/frontend/lib/request-handlers/auth-app-route-handler'
import { cancelOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/cancel-offer-request-handler'

export const POST = authAppRouteHandler(cancelOfferRequestHandler)
