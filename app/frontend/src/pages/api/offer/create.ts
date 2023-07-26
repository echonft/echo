import { authOptions } from '../auth/[...nextauth]'
import { withMethodValidation, withSession } from '@echo/api'
import { ApiRequest, CreateOfferRequest, ErrorResponse, OfferResponse } from '@echo/api/dist/types'
import { NextApiResponse } from 'next'

const createOffer = async (
  req: ApiRequest<CreateOfferRequest, never>,
  res: NextApiResponse<ErrorResponse | OfferResponse>
) => {
  try {
    await withMethodValidation(withSession(createOffer, authOptions), ['PUT'])(req, res)
  } catch (error) {
    return
  }
}

export default createOffer
