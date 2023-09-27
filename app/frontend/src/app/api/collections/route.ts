import type { ApiRequest } from '@echo/api/types/base/api-request'
import { getAllCollectionsRequestHandler } from '@server/request-handlers/collection/get-all-collections-request-handler'
import { handleRequest } from '@server/request-handlers/handle-request'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - filter see {@link CollectionQueryFilters}
 * @param request
 * @constructor
 */
export async function GET(request: ApiRequest<never>) {
  return await handleRequest(request, getAllCollectionsRequestHandler)
}
