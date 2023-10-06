import type { ApiRequest } from '@echo/api/types/api-request'
import { getAllCollectionsRequestHandler } from '@server/request-handlers/collection/get-all-collections-request-handler'
import { handleRequest } from '@server/request-handlers/handle-request'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *    - limitToLast not supported
 *  - filter see {@link CollectionQueryFilters}
 * @param request
 */
export async function GET(request: ApiRequest<never>) {
  return await handleRequest(request, getAllCollectionsRequestHandler)
}
