import type { ApiRequest } from '@echo/api/types/base/api-request'
import { getCollectionNftsRequestHandler } from '@server/request-handlers/collection/get-collection-nfts-request-handler'
import { handleRequest } from '@server/request-handlers/handle-request'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 * @param request
 * @param params
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getCollectionNftsRequestHandler, params.slug)
}
