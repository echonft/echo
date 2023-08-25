import { authOptions } from '../auth/[...nextauth]'
import { cancelListingRouteHandler } from '@echo/api'
import { ApiRequest, ApiResponse, EmptyResponse, IdRequest } from '@echo/api-public'

const cancelListing = async (req: ApiRequest<IdRequest>, res: ApiResponse<EmptyResponse>) => {
  await cancelListingRouteHandler(req, res, authOptions)
}

export default cancelListing
