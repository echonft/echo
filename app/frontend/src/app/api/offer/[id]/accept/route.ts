import { appRouteHandler } from '@echo/frontend/lib/server/request-handlers/app-route-handler'
import { acceptOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/accept-offer-request-handler'

export const POST = appRouteHandler(acceptOfferRequestHandler)
