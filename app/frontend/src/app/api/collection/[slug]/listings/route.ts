import { appRouteHandler } from '@echo/frontend/lib/request-handlers/app-route-handler'
import { getCollectionListingsRequestHandler } from '@echo/frontend/lib/request-handlers/collection/get-collection-listings-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - listing filters see {@link ListingQueryFilters}
 */

export const GET = appRouteHandler(getCollectionListingsRequestHandler)
