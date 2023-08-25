import { authOptions } from '../auth/[...nextauth]'
import { updateListingRouteHandler } from '@echo/api'
import { ApiRequest, ApiResponse, EmptyResponse, UpdateListingRequest } from '@echo/api-public'

const updateListing = async (req: ApiRequest<UpdateListingRequest>, res: ApiResponse<EmptyResponse>) => {
  await updateListingRouteHandler(req, res, authOptions)
}

export default updateListing
