import { authOptions } from '@app/api/auth/[...nextauth]/route'
import { createListingRouteHandler } from '@echo/api'
import { ApiRequest, CreateListingRequest } from '@echo/api-public'

export async function PUT(request: ApiRequest<CreateListingRequest>) {
  return await createListingRouteHandler(request, authOptions)
}
