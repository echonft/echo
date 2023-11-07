import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { getAllListingsRequestHandler } from '@echo/frontend/lib/server/request-handlers/listing/get-all-listings-request-handler'

/**
 * Available query params:
 * - query constraints see {@link QueryConstraintsQueryParams}
 *   - listing filters see {@link ListingQueryFilters}
 * @param request
 */
export async function GET(request: ApiRequest<never>) {
  return await handleRequest(request, getAllListingsRequestHandler)(request)
}
