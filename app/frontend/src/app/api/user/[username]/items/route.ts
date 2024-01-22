import { appRouteHandler } from '@echo/frontend/lib/request-handlers/app-route-handler'
import { getUserNftsRequestHandler } from '@echo/frontend/lib/request-handlers/user/get-user-nfts-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 */
export const GET = appRouteHandler(getUserNftsRequestHandler)
