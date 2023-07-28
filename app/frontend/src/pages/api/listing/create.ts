import { authOptions } from '../auth/[...nextauth]'
import { createRequestForOfferHandler, withMethodValidation, withSession } from '@echo/api'
import { ApiRequest, CreateRequestForOfferRequest, ErrorResponse, RequestForOfferResponse } from '@echo/api-public'
import { NextApiResponse } from 'next'

const createRequestForOffer = async (
  req: ApiRequest<CreateRequestForOfferRequest, never>,
  res: NextApiResponse<ErrorResponse | RequestForOfferResponse>
) => {
  try {
    await withMethodValidation(withSession(createRequestForOfferHandler, authOptions), ['PUT'])(req, res)
  } catch (error) {
    return
  }
}

export default createRequestForOffer
