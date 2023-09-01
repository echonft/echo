import { updateListingRouteHandler } from '@echo/api'
import { ApiRequest, UpdateListingRequest } from '@echo/api-public'
import { authOptions } from '@lib/constants/auth-options'

export async function POST(request: ApiRequest<UpdateListingRequest>, { params }: { params: { id: string } }) {
  return await updateListingRouteHandler(request, authOptions, params.id)
}
