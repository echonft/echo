import { authOptions } from '@app/api/auth/[...nextauth]/route'
import { updateOfferRouteHandler } from '@echo/api'
import { ApiRequest, UpdateOfferRequest } from '@echo/api-public'

export async function POST(request: ApiRequest<UpdateOfferRequest>, { params }: { params: { id: string } }) {
  return await updateOfferRouteHandler(request, authOptions, params.id)
}
