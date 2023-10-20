import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { nonceRequestHandler } from '@server/request-handlers/user/nonce-request-handler'

export async function GET(request: ApiRequest<never>) {
  return await handleRequest(request, nonceRequestHandler)
}
