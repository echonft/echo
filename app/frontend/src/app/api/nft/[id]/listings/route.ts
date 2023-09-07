import { handleRequest } from '../../../../../lib/server/request-handlers/handle-request'
import { getNftListingsRequestHandler } from '../../../../../lib/server/request-handlers/nft/get-nft-listings-request-handler'
import { ApiRequest } from '@echo/api'

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
