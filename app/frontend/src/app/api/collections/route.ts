import { appRouteHandler } from '@echo/frontend/lib/request-handlers/app-route-handler'
import { getAllCollectionsRequestHandler } from '@echo/frontend/lib/request-handlers/collection/get-all-collections-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - filter see {@link CollectionQueryFilters}
 */
export const GET = appRouteHandler(getAllCollectionsRequestHandler)
