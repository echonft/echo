import { authOptions } from '../auth/[...nextauth]'
import { createOfferRouteHandler } from '@echo/api'
import { ApiRequest, ApiResponse, CreateOfferRequest, IdResponse } from '@echo/api-public'

const createOffer = async (req: ApiRequest<CreateOfferRequest>, res: ApiResponse<IdResponse>) => {
  await createOfferRouteHandler(req, res, authOptions)
}

export default createOffer
