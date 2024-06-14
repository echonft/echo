import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertOffer } from '@echo/frontend/lib/helpers/offer/assert/assert-offer'
import { assertOfferSenderIs } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-sender-is'
import { assertOfferState } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-state'
import type { AuthRequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { OFFER_STATE_CANCELLED } from '@echo/model/constants/offer-states'
import type { WithSlug } from '@echo/model/types/with-slug'
import { NextResponse } from 'next/server'

export async function cancelOfferRequestHandler({ user, params }: AuthRequestHandlerArgsWithParams<WithSlug>) {
  const { slug } = params
  const offer = await guardAsyncFn(getOffer, ErrorStatus.SERVER_ERROR)(slug)
  assertOffer(offer)
  assertOfferState(offer, OFFER_STATE_CANCELLED)
  assertOfferSenderIs(offer, user.username)
  const updatedOffer = await guardAsyncFn(
    cancelOffer,
    ErrorStatus.SERVER_ERROR
  )({ slug, updateArgs: { trigger: { by: user.username } } })
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
