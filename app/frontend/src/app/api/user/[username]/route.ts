import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getUserRequestHandler } from '@server/request-handlers/user/get-user-request-handler'

export async function GET(request: ApiRequest<never>, { params }: { params: { username: string } }) {
  return await handleRequest(request, getUserRequestHandler, params.username)
}
