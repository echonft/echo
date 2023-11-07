import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { getAllCompletedOffersRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/get-all-completed-offers-request-handler'

/**
 * Available query params:
 * - query constraints see {@link QueryConstraintsQueryParams}
 * - listing filters see {@link ListingQueryFilters}
 * @param request
 */
export async function GET(request: ApiRequest<never>) {
  return await handleRequest(request, getAllCompletedOffersRequestHandler)(request)
}
