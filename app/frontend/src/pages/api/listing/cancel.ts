import { authOptions } from '../auth/[...nextauth]'
import { ApiRequest, ErrorResponse, withMethodValidation, withSession } from '@echo/api'
import { RequestForOfferRequest, RequestForOfferResponse } from '@echo/api/dist/types'
import { NextApiResponse } from 'next'

const cancelRequestForOffer = async (
  req: ApiRequest<RequestForOfferRequest, never>,
  res: NextApiResponse<ErrorResponse | RequestForOfferResponse>
) => {
  try {
    await withMethodValidation(withSession(cancelRequestForOffer, authOptions), ['PUT'])(req, res)
  } catch (error) {
    return
  }
}

export default cancelRequestForOffer
