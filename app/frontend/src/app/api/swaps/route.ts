import { appRouteHandler } from '@echo/frontend/lib/request-handlers/app-route-handler'
import { getAllCompletedOffersRequestHandler } from '@echo/frontend/lib/request-handlers/offer/get-all-completed-offers-request-handler'

/**
 * Available query params:
 * - query constraints see {@link QueryConstraintsQueryParams}
 * - listing filters see {@link ListingQueryFilters}
 */
export const GET = appRouteHandler(getAllCompletedOffersRequestHandler)
