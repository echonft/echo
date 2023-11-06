import { ApiRequest } from '@echo/api/types/api-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { guarded_assertOfferExists } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-exists'
import { guarded_assertOfferItemsApproval } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-items-approval'
import { guarded_assertOfferItemsOwner } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-items-owner'
import { guarded_assertOfferReceiverOrSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-receiver-or-sender-is'
import { guarded_findOfferById } from '@echo/frontend/lib/server/helpers/offer/guarded_find-offer-by-id'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { NextResponse } from 'next/server'

export async function getOfferRequestHandler(req: ApiRequest<never>, id: string) {
  const user = await getUserFromRequest(req)
  const offer = await guarded_findOfferById(id)
  guarded_assertOfferExists(offer, id)
  guarded_assertOfferReceiverOrSenderIs(offer, user.username)
  await guarded_assertOfferItemsOwner(offer)
  await guarded_assertOfferItemsApproval(offer)
  return NextResponse.json<OfferResponse>({ offer })
}
