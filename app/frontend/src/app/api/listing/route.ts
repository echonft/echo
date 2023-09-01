import { createListingRouteHandler } from '@echo/api'
import { ApiRequest, CreateListingRequest } from '@echo/api-public'
import { authOptions } from '@lib/constants/auth-options'

export async function PUT(request: ApiRequest<CreateListingRequest>) {
  return await createListingRouteHandler(request, authOptions)
}
