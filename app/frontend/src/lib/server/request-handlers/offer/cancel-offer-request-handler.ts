import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { guarded_assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-sender-is'
import { guarded_assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-state'
import { guarded_cancelOffer } from '@echo/frontend/lib/server/helpers/offer/guarded_cancel-offer'
import { guarded_findOfferById } from '@echo/frontend/lib/server/helpers/offer/guarded_find-offer-by-id'
import { guarded_getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request'
import { NextResponse } from 'next/server'

export async function cancelOfferRequestHandler(req: ApiRequest<never>, offerId: string) {
  const offer = await guarded_findOfferById(offerId)
  guarded_assertOffer(offer)
  guarded_assertOfferState(offer, 'CANCELLED')
  const user = await guarded_getUserFromRequest(req)
  guarded_assertOfferSenderIs(offer, user.username)
  const updatedOffer = await guarded_cancelOffer(offerId)
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
