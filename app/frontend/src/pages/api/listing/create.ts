import { authOptions } from '../auth/[...nextauth]'
import { ApiRequest, createRequestForOfferHandler, ErrorResponse, withMethodValidation, withSession } from '@echo/api'
import { CreateRequestForOfferRequest, RequestForOfferResponse } from '@echo/api/dist/types'
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
