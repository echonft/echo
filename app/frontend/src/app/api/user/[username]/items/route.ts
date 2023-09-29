import type { ApiRequest } from '@echo/api/types/base/api-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getUserNftsRequestHandler } from '@server/request-handlers/user/get-user-nfts-request-handler'

/**
 * Available query params:
 *  - query constraints see {@link QueryConstraintsQueryParams}
 * @param {ApiRequest<never>} request
 * @param {{username: string}} params
 * @return {Promise<NextResponse<ErrorResponse | GetNftsResponse>>}
 */
export async function GET(request: ApiRequest<never>, { params }: { params: { username: string } }) {
  return await handleRequest(request, getUserNftsRequestHandler, params.username)
}
