import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { nonceRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/nonce-request-handler'

export async function GET(request: ApiRequest<never>) {
  return await handleRequest(request, nonceRequestHandler)(request)
}
