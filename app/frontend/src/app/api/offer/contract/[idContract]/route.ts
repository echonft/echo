import { authRequestHandler } from '@echo/frontend/lib/request-handlers/auth-request-handler'
import { getOfferByIdContractRequestHandler } from '@echo/frontend/lib/request-handlers/offer/get-offer-by-id-contract-request-handler'

export const GET = authRequestHandler(getOfferByIdContractRequestHandler)
