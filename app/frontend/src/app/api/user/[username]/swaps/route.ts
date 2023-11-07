import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { getUserCompletedOffersRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/get-user-completed-offers-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 *  - offers filters see {@link OfferQueryFilters} - only 'as' is considered
 * @param {ApiRequest<never>} request
 * @param {{username: string}} params
 * @return {Promise<NextResponse<ErrorResponse | GetOffersResponse>>}
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { username: string } }) {
  return await handleRequest(request, getUserCompletedOffersRequestHandler)(request, params.username)
}
