import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferReceiverIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-receiver-is'
import { guarded_assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-state'
import { OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import type { AuthUser } from '@echo/model/types/auth-user'
import { NextResponse } from 'next/server'

export async function rejectOfferRequestHandler(user: AuthUser, _req: ApiRequest<never>, params: { id: string }) {
  const { id } = params
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(id)
  guarded_assertOffer(offer)
  guarded_assertOfferState(offer, OFFER_STATE_REJECTED)
  guarded_assertOfferReceiverIs(offer, user.username)
  const updatedOffer = await guardAsyncFn(
    rejectOffer,
    ErrorStatus.SERVER_ERROR
  )({ offerId: id, updateArgs: { trigger: { by: user.username } } })
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
