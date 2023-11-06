import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { guarded_assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferReceiverIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-receiver-is'
import { guarded_assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-state'
import { guarded_findOfferById } from '@echo/frontend/lib/server/helpers/offer/guarded_find-offer-by-id'
import { guarded_rejectOffer } from '@echo/frontend/lib/server/helpers/offer/guarded_reject-offer'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { NextResponse } from 'next/server'

export async function rejectOfferRequestHandler(req: ApiRequest<never>, offerId: string) {
  const offer = await guarded_findOfferById(offerId)
  guarded_assertOffer(offer)
  guarded_assertOfferState(offer, 'REJECTED')
  const user = await getUserFromRequest(req)
  guarded_assertOfferReceiverIs(offer, user.username)
  const updatedOffer = await guarded_rejectOffer(offerId)
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
