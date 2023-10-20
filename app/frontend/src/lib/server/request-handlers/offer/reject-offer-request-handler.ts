import { ApiRequest } from '@echo/api/types/api-request'
import { assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer'
import { assertOfferReceiverIs } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-receiver-is'
import { assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-state'
import { getOffer } from '@echo/frontend/lib/server/helpers/offer/get-offer'
import { rejectOffer } from '@echo/frontend/lib/server/helpers/offer/reject-offer'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { emptyResponse } from '@echo/frontend/lib/server/helpers/response/empty-response'

export async function rejectOfferRequestHandler(req: ApiRequest<never>, offerId: string) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertOfferState(offer, 'REJECTED')
  const user = await getUserFromRequest(req)
  assertOfferReceiverIs(offer, user.username)
  await rejectOffer(offerId)
  return emptyResponse()
}
