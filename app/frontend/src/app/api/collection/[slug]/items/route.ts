import { type ApiRequest } from '@echo/api/types/api-request'
import { getCollectionNftsRequestHandler } from '@echo/frontend/lib/server/request-handlers/collection/get-collection-nfts-request-handler'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 * @param request
 * @param params
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getCollectionNftsRequestHandler)(request, params.slug)
}
