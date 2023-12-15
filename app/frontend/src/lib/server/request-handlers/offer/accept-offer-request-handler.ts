import { type ApiRequest } from '@echo/api/types/api-request'
import { type AcceptOfferRequest } from '@echo/api/types/requests/accept-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferReceiverIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-receiver-is'
import { guarded_assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-state'
import { guarded_assertAuthUser } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-auth-user'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { acceptOfferSchema } from '@echo/frontend/lib/server/validators/accept-offer-schema'
import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import { NextResponse } from 'next/server'

export async function acceptOfferRequestHandler(req: ApiRequest<AcceptOfferRequest>, offerId: string) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<AcceptOfferRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { signature } = guardFn(
    (requestBody) => acceptOfferSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(offerId)
  guarded_assertOffer(offer)
  guarded_assertOfferState(offer, OFFER_STATE_ACCEPTED)
  const user = await getUserFromRequest(req)
  guarded_assertAuthUser(user)
  guarded_assertOfferReceiverIs(offer, user.username)
  const updatedOffer = await guardAsyncFn(
    acceptOffer,
    ErrorStatus.SERVER_ERROR
  )({ offerId, userId: user.id, signature, updateArgs: { trigger: { by: user.username } } })
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
