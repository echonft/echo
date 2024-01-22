import { appRouteHandler } from '@echo/frontend/lib/request-handlers/app-route-handler'
import { getUserListingsRequestHandler } from '@echo/frontend/lib/request-handlers/user/get-user-listings-request-handler'

/**
 * Available query params:
 * - query constraints see {@link QueryConstraintsQueryParams}
 * - listing filters see {@link ListingQueryFilters}
 */
export const GET = appRouteHandler(getUserListingsRequestHandler)
