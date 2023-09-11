import type { ApiRequest } from '@echo/api'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getUserListingsRequestHandler } from '@server/request-handlers/user/get-user-listings-request-handler'

export async function GET(request: ApiRequest<never>, { params }: { params: { username: string } }) {
  return await handleRequest(request, getUserListingsRequestHandler, params.username)
}
