import { authOptions } from '@app/api/auth/[...nextauth]/route'
import { nonceRouteHandler } from '@echo/api'
import { ApiRequest } from '@echo/api-public'

export async function GET(request: ApiRequest<never>) {
  return await nonceRouteHandler(request, authOptions)
}
