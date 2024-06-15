import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertOffer } from '@echo/frontend/lib/helpers/offer/assert/assert-offer'
import { assertOfferReceiverIs } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-receiver-is'
import { assertOfferState } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-state'
import { assertUserExists } from '@echo/frontend/lib/helpers/user/assert/assert-user-exists'
import type { AuthRequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import type { WithSlug } from '@echo/model/types/with-slug'
import { NextResponse } from 'next/server'

export async function acceptOfferRequestHandler({ user, logger, params }: AuthRequestHandlerArgsWithParams<WithSlug>) {
  const { slug } = params
  const offer = await guardAsyncFn({ fn: getOffer, status: ErrorStatus.SERVER_ERROR, logger })(slug)
  assertOffer(offer)
  assertOfferState(offer, OFFER_STATE_ACCEPTED)
  assertOfferReceiverIs(offer, user.username)
  const foundUser = await guardAsyncFn({ fn: getUserByUsername, status: ErrorStatus.SERVER_ERROR, logger })(
    user.username
  )
  assertUserExists(foundUser, user.username)
  const updatedOffer = await guardAsyncFn({
    fn: acceptOffer,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })({ slug, updateArgs: { trigger: { by: user.username } } })
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
