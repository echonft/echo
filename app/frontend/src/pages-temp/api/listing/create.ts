import { authOptions } from '../auth/[...nextauth]'
import { createListingRouteHandler } from '@echo/api'
import { ApiRequest, ApiResponse, CreateListingRequest, IdResponse } from '@echo/api-public'

const createListing = async (req: ApiRequest<CreateListingRequest>, res: ApiResponse<IdResponse>) => {
  await createListingRouteHandler(req, res, authOptions)
}

export default createListing
