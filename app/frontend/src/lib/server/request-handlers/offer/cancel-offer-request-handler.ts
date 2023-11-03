import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer'
import { assertOfferSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-sender-is'
import { assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-state'
import { cancelOffer } from '@echo/frontend/lib/server/helpers/offer/cancel-offer'
import { getOffer } from '@echo/frontend/lib/server/helpers/offer/get-offer'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { NextResponse } from 'next/server'

export async function cancelOfferRequestHandler(req: ApiRequest<never>, offerId: string) {
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertOfferState(offer, 'CANCELLED')
  const user = await getUserFromRequest(req)
  assertOfferSenderIs(offer, user.username)
  const updatedOffer = await cancelOffer(offerId)
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
