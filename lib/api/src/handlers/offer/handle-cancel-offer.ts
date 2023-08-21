import { ApiError } from '../../helpers/api-error'
import { getOffer } from '../../helpers/offer/get-offer'
import { ErrorResponse, UpdateOfferResponse } from '@echo/api-public'
import { User } from '@echo/firestore'
import { NextApiResponse } from 'next'

export const handleCancelOffer = async (
  offerId: string,
  user: User,
  res: NextApiResponse<UpdateOfferResponse | ErrorResponse>
) => {
  try {
    const offer = await getOffer(offerId)
  } catch (e) {
    const { status, message } = e as ApiError
    res.end(res.status(status).json({ error: message }))
    return
  }
}
