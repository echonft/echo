import { authOptions } from '@app/api/auth/[...nextauth]/route'
import { updateListingRouteHandler } from '@echo/api'
import { ApiRequest, UpdateListingRequest } from '@echo/api-public'

export async function POST(request: ApiRequest<UpdateListingRequest>, { params }: { params: { id: string } }) {
  return await updateListingRouteHandler(request, authOptions, params.id)
}
