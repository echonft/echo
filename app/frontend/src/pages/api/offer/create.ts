import { authOptions } from '../auth/[...nextauth]'
import { withMethodValidation, withSession } from '@echo/api'
import { ApiRequest, CreateOfferRequest, ErrorResponse, IdResponse } from '@echo/api-public'
import { NextApiResponse } from 'next'

const createOffer = async (
  req: ApiRequest<CreateOfferRequest, never>,
  res: NextApiResponse<ErrorResponse | IdResponse>
) => {
  try {
    await withMethodValidation(withSession(createOffer, authOptions), ['PUT'])(req, res)
  } catch (error) {
    return
  }
}

export default createOffer
