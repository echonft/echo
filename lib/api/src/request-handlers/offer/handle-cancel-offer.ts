import { assertOffer } from '../../helpers/offer/assert-offer'
import { cancelOffer } from '../../helpers/offer/cancel-offer'
import { getOffer } from '../../helpers/offer/get-offer'
import { assertUserIs } from '../../helpers/user/assert-user-is'
import { ApiResponse, EmptyResponse } from '@echo/api-public'
import { User } from '@echo/firestore'

export async function handleCancelOffer(offerId: string, user: User, res: ApiResponse<EmptyResponse>) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertUserIs(offer!.sender.id, user)
  await cancelOffer(offerId)
  return res.status(200).json({})
}
