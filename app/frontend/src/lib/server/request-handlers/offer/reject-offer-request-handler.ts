import { ApiRequest } from '@echo/api/types/base/api-request'
import { assertOffer } from '@server/helpers/offer/assert-offer'
import { assertOfferSenderIs } from '@server/helpers/offer/assert-offer-sender-is'
import { assertOfferState } from '@server/helpers/offer/assert-offer-state'
import { getOffer } from '@server/helpers/offer/get-offer'
import { rejectOffer } from '@server/helpers/offer/reject-offer'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { emptyResponse } from '@server/helpers/response/empty-response'

export async function rejectOfferRequestHandler(req: ApiRequest<never>, offerId: string) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertOfferState(offer, 'OPEN')
  const user = await getUserFromRequest(req)
  assertOfferSenderIs(offer, user.name)
  await rejectOffer(offerId)
  return emptyResponse()
}
