import { authAppRouteHandler } from '@echo/frontend/lib/server/request-handlers/auth-app-route-handler'
import { rejectOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/reject-offer-request-handler'

export const POST = authAppRouteHandler(rejectOfferRequestHandler)
