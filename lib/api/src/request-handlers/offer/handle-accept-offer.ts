import { acceptOffer } from '../../helpers/offer/accept-offer'
import { assertOffer } from '../../helpers/offer/assert-offer'
import { getOffer } from '../../helpers/offer/get-offer'
import { assertUserIs } from '../../helpers/user/assert-user-is'
import { ApiResponse, EmptyResponse } from '@echo/api-public'
import { User } from '@echo/firestore'

export async function handleAcceptOffer(offerId: string, user: User, res: ApiResponse<EmptyResponse>) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertUserIs(offer!.receiver.id, user)
  await acceptOffer(offerId)
  return res.status(200).json({})
}
