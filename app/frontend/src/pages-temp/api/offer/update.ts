import { authOptions } from '../auth/[...nextauth]'
import { updateOfferRouteHandler } from '@echo/api'
import { ApiRequest, ApiResponse, EmptyResponse, UpdateOfferRequest } from '@echo/api-public'

const updateOffer = async (req: ApiRequest<UpdateOfferRequest>, res: ApiResponse<EmptyResponse>) => {
  await updateOfferRouteHandler(req, res, authOptions)
}

export default updateOffer
