import { ApiRequest } from '@echo/api/types/api-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { assertOfferExists } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-exists'
import { assertOfferItemsApproval } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-items-approval'
import { assertOfferItemsOwner } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-items-owner'
import { assertOfferReceiverOrSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-receiver-or-sender-is'
import { guarded_findOfferById } from '@echo/frontend/lib/server/helpers/offer/guarded_find-offer-by-id'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { NextResponse } from 'next/server'

export async function getOfferRequestHandler(req: ApiRequest<never>, id: string) {
  const user = await getUserFromRequest(req)
  const offer = await guarded_findOfferById(id)
  assertOfferExists(offer, id)
  assertOfferReceiverOrSenderIs(offer, user.username)
  await assertOfferItemsOwner(offer)
  await assertOfferItemsApproval(offer)
  return NextResponse.json<OfferResponse>({ offer })
}
