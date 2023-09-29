import { ApiRequest } from '@echo/api/types/base/api-request'
import { assertOffer } from '@server/helpers/offer/assert-offer'
import { assertOfferSenderIs } from '@server/helpers/offer/assert-offer-sender-is'
import { assertOfferState } from '@server/helpers/offer/assert-offer-state'
import { cancelOffer } from '@server/helpers/offer/cancel-offer'
import { getOffer } from '@server/helpers/offer/get-offer'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { emptyResponse } from '@server/helpers/response/empty-response'

export async function cancelOfferRequestHandler(req: ApiRequest<never>, offerId: string) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertOfferState(offer, 'OPEN', 'ACCEPTED')
  const user = await getUserFromRequest(req)
  assertOfferSenderIs(offer, user.username)
  await cancelOffer(offerId)
  return emptyResponse()
}
