import { appRouteHandler } from '@echo/frontend/lib/server/request-handlers/app-route-handler'
import { getCollectionCompletedOffersRequestHandler } from '@echo/frontend/lib/server/request-handlers/collection/get-collection-completed-offers-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - offers filters see {@link OfferQueryFilters} - only 'as' is considered
 */

export const GET = appRouteHandler(getCollectionCompletedOffersRequestHandler)
