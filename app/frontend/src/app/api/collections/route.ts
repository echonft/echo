import type { ApiRequest } from '@echo/api/types'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getAllCollectionsRequestHandler } from '@server/request-handlers/nft-collection/get-all-collections-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 * @param request
 * @constructor
 */
export async function GET(request: ApiRequest<never>) {
  return await handleRequest(request, getAllCollectionsRequestHandler)
}
