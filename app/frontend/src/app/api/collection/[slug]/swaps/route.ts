import { type ApiRequest } from '@echo/api/types/api-request'
import { getCollectionCompletedOffersRequestHandler } from '@server/request-handlers/collection/get-collection-completed-offers-request-handler'
import { handleRequest } from '@server/request-handlers/handle-request'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - offers filters see {@link OfferQueryFilters} - only 'as' is considered
 * @param request
 * @param params
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getCollectionCompletedOffersRequestHandler, params.slug)
}
