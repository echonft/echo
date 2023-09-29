import type { ApiRequest } from '@echo/api/types/base/api-request'
import { getCollectionListingsRequestHandler } from '@server/request-handlers/collection/get-collection-listings-request-handler'
import { handleRequest } from '@server/request-handlers/handle-request'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - listing filters see {@link ListingQueryFilters}
 * @param request
 * @param params
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getCollectionListingsRequestHandler, params.slug)
}
