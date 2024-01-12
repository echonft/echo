import { appRouteHandler } from '@echo/frontend/lib/server/request-handlers/app-route-handler'
import { getCollectionNftsRequestHandler } from '@echo/frontend/lib/server/request-handlers/collection/get-collection-nfts-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 */

export const GET = appRouteHandler(getCollectionNftsRequestHandler)
