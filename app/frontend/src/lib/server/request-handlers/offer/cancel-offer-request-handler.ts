import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-sender-is'
import { guarded_assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-state'
import { OFFER_STATE_CANCELLED } from '@echo/model/constants/offer-states'
import type { AuthUser } from '@echo/model/types/auth-user'
import { NextResponse } from 'next/server'

export async function cancelOfferRequestHandler(user: AuthUser, _req: ApiRequest<never>, params: { id: string }) {
  const { id } = params
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(id)
  guarded_assertOffer(offer)
  guarded_assertOfferState(offer, OFFER_STATE_CANCELLED)
  guarded_assertOfferSenderIs(offer, user.username)
  const updatedOffer = await guardAsyncFn(
    cancelOffer,
    ErrorStatus.SERVER_ERROR
  )({ offerId: id, updateArgs: { trigger: { by: user.username } } })
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
