import { acceptOffer } from '../../helpers/offer/accept-offer'
import { assertOffer } from '../../helpers/offer/assert-offer'
import { getOffer } from '../../helpers/offer/get-offer'
import { assertUserIs } from '../../helpers/user/assert-user-is'
import { EmptyResponse } from '@echo/api-public'
import { User } from '@echo/firestore'
import { NextApiResponse } from 'next'

export async function handleAcceptOffer(offerId: string, user: User, res: NextApiResponse<EmptyResponse>) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertUserIs(offer!.receiver.id, user)
  await acceptOffer(offerId)
  return res.status(200).json({})
}
