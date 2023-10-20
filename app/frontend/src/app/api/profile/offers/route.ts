import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getCurrentUserOffersRequestHandler } from '@server/request-handlers/user/get-current-user-offers-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - offers filters see {@link OfferQueryFilters}
 * @param {ApiRequest<never>} request
 * @return {Promise<NextResponse<ErrorResponse | GetOffersResponse>>}
 */
export async function GET(request: ApiRequest<never>) {
  return await handleRequest(request, getCurrentUserOffersRequestHandler)
}
