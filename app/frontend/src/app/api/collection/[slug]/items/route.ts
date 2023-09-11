import type { ApiRequest } from '@echo/api'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getNftCollectionNftsRequestHandler } from '@server/request-handlers/nft-collection/get-nft-collection-nfts-request-handler'

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
