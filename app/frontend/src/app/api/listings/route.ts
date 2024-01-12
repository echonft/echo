import { appRouteHandler } from '@echo/frontend/lib/server/request-handlers/app-route-handler'
import { getAllListingsRequestHandler } from '@echo/frontend/lib/server/request-handlers/listing/get-all-listings-request-handler'

/**
 * Available query params:
 * - query constraints see {@link QueryConstraintsQueryParams}
 *   - listing filters see {@link ListingQueryFilters}
 */
export const GET = appRouteHandler(getAllListingsRequestHandler)
