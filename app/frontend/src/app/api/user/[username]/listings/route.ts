import { type ApiRequest } from '@echo/api/types/api-request'
import type { ErrorResponse } from '@echo/api/types/responses/error-response'
import type { ListingsResponse } from '@echo/api/types/responses/listings-response'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { getUserListingsRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/get-user-listings-request-handler'
import type { NextResponse } from 'next/server'

/**
 * Available query params:
 * - query constraints see {@link QueryConstraintsQueryParams}
 * - listing filters see {@link ListingQueryFilters}
 * @param {ApiRequest<never>} request
 * @param {{username: string}} params
 * @return {Promise<NextResponse<ErrorResponse | ListingsResponse>>}
 */
export async function GET(
  request: ApiRequest<never>,
  { params }: { params: { username: string } }
): Promise<NextResponse<ErrorResponse | ListingsResponse>> {
  return await handleRequest(request, getUserListingsRequestHandler, params.username)
}
