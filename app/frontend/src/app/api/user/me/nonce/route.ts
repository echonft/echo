import { nonceRouteHandler } from '@echo/api'
import { ApiRequest } from '@echo/api-public'
import { authOptions } from '@lib/constants/auth-options'

export async function GET(request: ApiRequest<never>) {
  return await nonceRouteHandler(request, authOptions)
}
