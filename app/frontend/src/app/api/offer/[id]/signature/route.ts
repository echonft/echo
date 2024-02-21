import { authRouteHandler } from '@echo/frontend/lib/request-handlers/auth-route-handler'
import { getOfferSignatureRequestHandler } from '@echo/frontend/lib/request-handlers/offer/get-offer-signature-request-handler'

export const GET = authRouteHandler(getOfferSignatureRequestHandler)
