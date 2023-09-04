import { authOptions } from '../../../../../lib/constants/auth-options'
import { handleRestrictedRequest } from '../../../../../lib/server/request-handlers/handle-restricted-request'
import { nonceRequestHandler } from '../../../../../lib/server/request-handlers/user/nonce-request-handler'
import { ApiRequest } from '@echo/api'

export async function GET(request: ApiRequest<never>) {
  return await handleRestrictedRequest(request, authOptions, nonceRequestHandler)
}
