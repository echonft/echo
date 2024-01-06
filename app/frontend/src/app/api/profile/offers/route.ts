import { authAppRouteHandler } from '@echo/frontend/lib/server/request-handlers/auth-app-route-handler'
import { getCurrentUserOffersRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/get-current-user-offers-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - offers filters see {@link OfferQueryFilters}
 */
export const GET = authAppRouteHandler(getCurrentUserOffersRequestHandler)
