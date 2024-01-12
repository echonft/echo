import { authAppRouteHandler } from '@echo/frontend/lib/server/request-handlers/auth-app-route-handler'
import { getOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/get-offer-request-handler'

export const GET = authAppRouteHandler(getOfferRequestHandler)
