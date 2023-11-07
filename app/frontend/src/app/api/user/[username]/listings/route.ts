import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { getUserListingsRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/get-user-listings-request-handler'

/**
 * Available query params:
 * - query constraints see {@link QueryConstraintsQueryParams}
 * - listing filters see {@link ListingQueryFilters}
 * @param {ApiRequest<never>} request
 * @param {{username: string}} params
 * @return {Promise<ApiResponse<GetListingsReponse>}
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { username: string } }) {
  return await handleRequest(request, getUserListingsRequestHandler)(request, params.username)
}
