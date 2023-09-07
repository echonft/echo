import { handleRequest } from '../../../../../lib/server/request-handlers/handle-request'
import { getNftCollectionOffersRequestHandler } from '../../../../../lib/server/request-handlers/nft-collection/get-nft-collection-offers-request-handler'
import { ApiRequest } from '@echo/api'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - offers filters see {@link OfferQueryFilters}
 * @param request
 * @param params
 * @constructor
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getNftCollectionOffersRequestHandler, params.slug)
}
