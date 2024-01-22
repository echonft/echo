import { appRouteHandler } from '@echo/frontend/lib/request-handlers/app-route-handler'
import { getCollectionsRequestHandler } from '@echo/frontend/lib/request-handlers/collection/get-collections-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - filter see {@link CollectionQueryFilters}
 */
export const GET = appRouteHandler(getCollectionsRequestHandler)
