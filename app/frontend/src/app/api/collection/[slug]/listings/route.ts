import { handleRequest } from '../../../../../lib/server/request-handlers/handle-request'
import { getNftCollectionListingsRequestHandler } from '../../../../../lib/server/request-handlers/nft-collection/get-nft-collection-listings-request-handler'
import { ApiRequest } from '@echo/api'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - listing filters see {@link ListingQueryFilters}
 * @param request
 * @param params
 * @constructor
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getNftCollectionListingsRequestHandler, params.slug)
}
