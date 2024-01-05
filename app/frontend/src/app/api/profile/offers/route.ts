import { auth } from '@echo/frontend/lib/helpers/auth/auth'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { getCurrentUserOffersRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/get-current-user-offers-request-handler'
import type { NextAuthRequest } from 'next-auth/lib'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - offers filters see {@link OfferQueryFilters}
 * @type {AppRouteHandlerFn}
 */
export const GET = auth(function GET(request: NextAuthRequest) {
  return handleRequest(request, getCurrentUserOffersRequestHandler)(request)
})
