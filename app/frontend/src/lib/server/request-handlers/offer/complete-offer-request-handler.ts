import { type ApiRequest } from '@echo/api/types/api-request'
import type { CompleteOfferRequest } from '@echo/api/types/requests/complete-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-sender-is'
import { guarded_assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-state'
import { guarded_assertAuthUser } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-auth-user'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { completeOfferSchema } from '@echo/frontend/lib/server/validators/complete-offer-schema'
import { NextResponse } from 'next/server'

export async function completeOfferRequestHandler(req: ApiRequest<CompleteOfferRequest>, offerId: string) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<CompleteOfferRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { transactionId } = guardFn(
    (requestBody) => completeOfferSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(offerId)
  guarded_assertOffer(offer)
  guarded_assertOfferState(offer, 'COMPLETED')
  const user = await getUserFromRequest(req)
  guarded_assertAuthUser(user)
  guarded_assertOfferSenderIs(offer, user.username)
  const updatedOffer = await guardAsyncFn(
    completeOffer,
    ErrorStatus.SERVER_ERROR
  )({ offerId, transactionId, updateArgs: { trigger: { by: user.username } } })
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
