import { ApiRequest } from '@echo/api/types/api-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertOfferExists } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-exists'
import { guarded_assertOfferItemsApproval } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-items-approval'
import { guarded_assertOfferItemsOwner } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-items-owner'
import { guarded_assertOfferReceiverOrSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-receiver-or-sender-is'
import { guarded_assertAuthUser } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-auth-user'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { NextResponse } from 'next/server'

export async function getOfferRequestHandler(req: ApiRequest<never>, offerId: string) {
  const user = await getUserFromRequest(req)
  guarded_assertAuthUser(user)
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(offerId)
  guarded_assertOfferExists(offer, offerId)
  guarded_assertOfferReceiverOrSenderIs(offer, user.username)
  await guarded_assertOfferItemsOwner(offer)
  await guarded_assertOfferItemsApproval(offer)
  return NextResponse.json<OfferResponse>({ offer })
}
