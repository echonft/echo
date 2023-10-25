import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { getNftListingsRequestHandler } from '@echo/frontend/lib/server/request-handlers/nft/get-nft-listings-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - listing filters see {@link ListingQueryFilters}
 * @param request
 * @param params
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, getNftListingsRequestHandler, params.id)
}
