import { authAppRouteHandler } from '@echo/frontend/lib/request-handlers/auth-app-route-handler'
import { validateOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/validate-offer-request-handler'

/**
 * The sender or the receiver of an offer can request the server to validate it
 */
export const GET = authAppRouteHandler(validateOfferRequestHandler)
