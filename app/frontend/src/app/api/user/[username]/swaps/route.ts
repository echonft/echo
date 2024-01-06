import { appRouteHandler } from '@echo/frontend/lib/server/request-handlers/app-route-handler'
import { getUserCompletedOffersRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/get-user-completed-offers-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - offers filters see {@link OfferQueryFilters} - only 'as' is considered
 */
export const GET = appRouteHandler(getUserCompletedOffersRequestHandler)
