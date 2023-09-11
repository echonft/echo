import type { ApiRequest } from '@echo/api'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getNftCollectionCompletedOffersRequestHandler } from '@server/request-handlers/nft-collection/get-nft-collection-completed-offers-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - offers filters see {@link OfferQueryFilters} - only 'as' is considered
 * @param request
 * @param params
 * @constructor
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getNftCollectionCompletedOffersRequestHandler, params.slug)
}
