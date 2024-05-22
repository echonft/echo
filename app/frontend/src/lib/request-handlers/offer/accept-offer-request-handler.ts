import { type ApiRequest } from '@echo/api/types/api-request'
import { type AcceptOfferRequest } from '@echo/api/types/requests/accept-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertOffer } from '@echo/frontend/lib/helpers/offer/assert/assert-offer'
import { assertOfferReceiverIs } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-receiver-is'
import { assertOfferState } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-state'
import { assertUserExists } from '@echo/frontend/lib/helpers/user/assert/assert-user-exists'
import { acceptOfferSchema } from '@echo/frontend/lib/validators/accept-offer-schema'
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
  const offer = await guardAsyncFn(getOfferById, ErrorStatus.SERVER_ERROR)(id)
  assertOffer(offer)
  assertOfferState(offer, OFFER_STATE_ACCEPTED)
  assertOfferReceiverIs(offer, user.username)
  const foundUser = await guardAsyncFn(getUserByUsername, ErrorStatus.SERVER_ERROR)(user.username)
  assertUserExists(foundUser, user.username)
  const updatedOffer = await guardAsyncFn(
    acceptOffer,
    ErrorStatus.SERVER_ERROR
  )({ offerId: id, userId: foundUser.id, signature, updateArgs: { trigger: { by: user.username } } })
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
