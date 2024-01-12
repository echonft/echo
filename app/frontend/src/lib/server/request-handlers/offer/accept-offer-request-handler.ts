import { type ApiRequest } from '@echo/api/types/api-request'
import { type AcceptOfferRequest } from '@echo/api/types/requests/accept-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferReceiverIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-receiver-is'
import { guarded_assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-state'
import { guarded_assertUserExists } from '@echo/frontend/lib/server/helpers/user/assert/guarded_assert-user-exists'
import { acceptOfferSchema } from '@echo/frontend/lib/server/validators/accept-offer-schema'
import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import type { AuthUser } from '@echo/model/types/auth-user'
import { NextResponse } from 'next/server'

export async function acceptOfferRequestHandler(
  user: AuthUser,
  req: ApiRequest<AcceptOfferRequest>,
  params: { id: string }
) {
  const { id } = params
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<AcceptOfferRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { signature } = guardFn(
    (requestBody) => acceptOfferSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(id)
  guarded_assertOffer(offer)
  guarded_assertOfferState(offer, OFFER_STATE_ACCEPTED)
  guarded_assertOfferReceiverIs(offer, user.username)
  const foundUser = await guardAsyncFn(findUserByUsername, ErrorStatus.SERVER_ERROR)(user.username)
  guarded_assertUserExists(foundUser, user.username)
  const updatedOffer = await guardAsyncFn(
    acceptOffer,
    ErrorStatus.SERVER_ERROR
  )({ offerId: id, userId: foundUser.id, signature, updateArgs: { trigger: { by: user.username } } })
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
