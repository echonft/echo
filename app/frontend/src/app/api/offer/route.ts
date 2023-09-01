import { createOfferRouteHandler } from '@echo/api'
import { ApiRequest, CreateOfferRequest } from '@echo/api-public'
import { authOptions } from '@lib/constants/auth-options'

export async function PUT(request: ApiRequest<CreateOfferRequest>) {
  return await createOfferRouteHandler(request, authOptions)
}
