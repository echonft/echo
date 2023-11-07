import { type ApiRequest } from '@echo/api/types/api-request'
import { getCollectionListingsRequestHandler } from '@echo/frontend/lib/server/request-handlers/collection/get-collection-listings-request-handler'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - listing filters see {@link ListingQueryFilters}
 * @param request
 * @param params
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getCollectionListingsRequestHandler)(request, params.slug)
}
