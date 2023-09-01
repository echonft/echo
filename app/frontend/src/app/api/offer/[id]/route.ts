import { updateOfferRouteHandler } from '@echo/api'
import { ApiRequest, UpdateOfferRequest } from '@echo/api-public'
import { authOptions } from '@lib/constants/auth-options'

export async function POST(request: ApiRequest<UpdateOfferRequest>, { params }: { params: { id: string } }) {
  return await updateOfferRouteHandler(request, authOptions, params.id)
}
