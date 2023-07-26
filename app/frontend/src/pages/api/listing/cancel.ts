import { authOptions } from '../auth/[...nextauth]'
import { withMethodValidation, withSession } from '@echo/api'
import { ApiRequest, ErrorResponse, IdRequest, RequestForOfferResponse } from '@echo/api/dist/types'
import { NextApiResponse } from 'next'

const cancelRequestForOffer = async (
  req: ApiRequest<IdRequest, never>,
  res: NextApiResponse<ErrorResponse | RequestForOfferResponse>
) => {
  try {
    await withMethodValidation(withSession(cancelRequestForOffer, authOptions), ['PUT'])(req, res)
  } catch (error) {
    return
  }
}

export default cancelRequestForOffer
