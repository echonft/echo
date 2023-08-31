import { authOptions } from '@app/api/auth/[...nextauth]/route'
import { createOfferRouteHandler } from '@echo/api'
import { ApiRequest, CreateOfferRequest } from '@echo/api-public'

export async function PUT(request: ApiRequest<CreateOfferRequest>) {
  return await createOfferRouteHandler(request, authOptions)
}
