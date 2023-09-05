import { handleRequest } from '../../../../../lib/server/request-handlers/handle-request'
import { getNftCollectionNftsRequestHandler } from '../../../../../lib/server/request-handlers/nft-collection/get-nft-collection-nfts-request-handler'
import { ApiRequest } from '@echo/api'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 * @param request
 * @param params
 * @constructor
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getNftCollectionNftsRequestHandler, params.slug)
}
