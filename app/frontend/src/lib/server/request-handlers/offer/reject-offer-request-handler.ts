import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferReceiverIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-receiver-is'
import { guarded_assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-state'
import { guarded_assertAuthUser } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-auth-user'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import { NextResponse } from 'next/server'

export async function rejectOfferRequestHandler(req: ApiRequest<never>, offerId: string) {
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(offerId)
  guarded_assertOffer(offer)
  guarded_assertOfferState(offer, OFFER_STATE_REJECTED)
  const user = await getUserFromRequest(req)
  guarded_assertAuthUser(user)
  guarded_assertOfferReceiverIs(offer, user.username)
  const updatedOffer = await guardAsyncFn(
    rejectOffer,
    ErrorStatus.SERVER_ERROR
  )({ offerId, updateArgs: { trigger: { by: user.username } } })
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
