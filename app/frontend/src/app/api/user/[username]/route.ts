import { handleRequest } from '../../../../lib/server/request-handlers/handle-request'
import { getUserRequestHandler } from '../../../../lib/server/request-handlers/user/get-user-request-handler'
import { ApiRequest } from '@echo/api'

export async function GET(request: ApiRequest<never>, { params }: { params: { username: string } }) {
  return await handleRequest(request, getUserRequestHandler, params.username)
}
