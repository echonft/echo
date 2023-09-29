import type { ApiRequest } from '@echo/api/types/base/api-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getUserListingsRequestHandler } from '@server/request-handlers/user/get-user-listings-request-handler'

/**
 * Available query params:
 * - query constraints see {@link QueryConstraintsQueryParams}
 * - listing filters see {@link ListingQueryFilters}
 * @param {ApiRequest<never>} request
 * @param {{username: string}} params
 * @return {Promise<NextResponse<ErrorResponse | GetListingsResponse>>}
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { username: string } }) {
  return await handleRequest(request, getUserListingsRequestHandler, params.username)
}
