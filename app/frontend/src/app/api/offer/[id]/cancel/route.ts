import { authAppRouteHandler } from '@echo/frontend/lib/server/request-handlers/auth-app-route-handler'
import { cancelOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/cancel-offer-request-handler'

export const POST = authAppRouteHandler(cancelOfferRequestHandler)
