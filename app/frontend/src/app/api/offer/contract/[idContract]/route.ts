import { authRouteHandler } from '@echo/frontend/lib/request-handlers/auth-route-handler'
import { getOfferByIdContractRequestHandler } from '@echo/frontend/lib/request-handlers/offer/get-offer-by-id-contract-request-handler'

export const GET = authRouteHandler(getOfferByIdContractRequestHandler)
