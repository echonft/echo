import { authRequestHandler } from '@echo/backend/request-handlers/auth-request-handler'
import { getOfferByIdContractRequestHandler } from '@echo/backend/request-handlers/offer/get-offer-by-id-contract-request-handler'

export const GET = authRequestHandler(getOfferByIdContractRequestHandler)
