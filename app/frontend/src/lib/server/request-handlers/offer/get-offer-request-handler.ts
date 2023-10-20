import { ApiRequest } from '@echo/api/types/api-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { assertOffer } from '@server/helpers/offer/assert/assert-offer'
import { assertOfferReceiverOrSenderIs } from '@server/helpers/offer/assert/assert-offer-receiver-or-sender-is'
import { getOffer } from '@server/helpers/offer/get-offer'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { NextResponse } from 'next/server'

export async function getOfferRequestHandler(req: ApiRequest<never>, id: string) {
  const user = await getUserFromRequest(req)
  const offer = await getOffer(id)
  assertOffer(offer)
  assertOfferReceiverOrSenderIs(offer, user.username)
  return NextResponse.json<OfferResponse>({ offer })
}
