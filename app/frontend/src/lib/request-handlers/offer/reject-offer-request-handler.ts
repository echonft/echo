import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertOffer } from '@echo/frontend/lib/helpers/offer/assert/assert-offer'
import { assertOfferReceiverIs } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-receiver-is'
import { assertOfferState } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-state'
import { OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { WithSlug } from '@echo/model/types/with-slug'
import { NextResponse } from 'next/server'

export async function rejectOfferRequestHandler(user: AuthUser, _req: ApiRequest<never>, params: WithSlug) {
  const { slug } = params
  const offer = await guardAsyncFn(getOffer, ErrorStatus.SERVER_ERROR)(slug)
  assertOffer(offer)
  assertOfferState(offer, OFFER_STATE_REJECTED)
  assertOfferReceiverIs(offer, user.username)
  const updatedOffer = await guardAsyncFn(
    rejectOffer,
    ErrorStatus.SERVER_ERROR
  )({ slug, updateArgs: { trigger: { by: user.username } } })
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
