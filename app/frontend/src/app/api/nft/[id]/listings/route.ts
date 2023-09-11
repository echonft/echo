import type { ApiRequest } from '@echo/api'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getNftListingsRequestHandler } from '@server/request-handlers/nft/get-nft-listings-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - listing filters see {@link ListingQueryFilters}
 * @param request
 * @param params
 * @constructor
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, getNftListingsRequestHandler, params.id)
}
