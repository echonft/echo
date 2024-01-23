import { authAppRouteHandler } from '@echo/frontend/lib/request-handlers/auth-app-route-handler'
import { getOfferSignatureRequestHandler } from '@echo/frontend/lib/request-handlers/offer/get-offer-signature-request-handler'

export const GET = authAppRouteHandler(getOfferSignatureRequestHandler)
