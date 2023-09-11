import { authOptions } from '@constants/auth-options'
import type { ApiRequest } from '@echo/api'
import { handleRestrictedRequest } from '@server/request-handlers/handle-restricted-request'
import { nonceRequestHandler } from '@server/request-handlers/user/nonce-request-handler'

export async function GET(request: ApiRequest<never>) {
  return await handleRestrictedRequest(request, authOptions, nonceRequestHandler)
}
