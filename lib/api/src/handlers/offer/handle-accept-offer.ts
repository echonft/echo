import { ApiError } from '../../helpers/api-error'
import { acceptOffer } from '../../helpers/offer/accept-offer'
import { assertOffer } from '../../helpers/offer/assert-offer'
import { getOffer } from '../../helpers/offer/get-offer'
import { assertUserIs } from '../../helpers/user/assert-user-is'
import { EmptyResponse, ErrorResponse } from '@echo/api-public'
import { NextApiResponse } from 'next'
import { Session } from 'next-auth'

export const handleAcceptOffer = async (
  offerId: string,
  session: Session | undefined,
  res: NextApiResponse<EmptyResponse | ErrorResponse>
) => {
  try {
    const offer = await getOffer(offerId)
    assertOffer(offer)
    assertUserIs(offer!.receiver.id, session)
    await acceptOffer(offerId)
    return res.status(200).json({})
  } catch (e) {
    const { status, message } = e as ApiError
    res.end(res.status(status).json({ error: message }))
    return
  }
}
