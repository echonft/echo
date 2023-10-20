import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { assertOffer } from '@server/helpers/offer/assert/assert-offer'
import { assertOfferSenderIs } from '@server/helpers/offer/assert/assert-offer-sender-is'
import { assertOfferSignature } from '@server/helpers/offer/assert/assert-offer-signature'
import { getOffer } from '@server/helpers/offer/get-offer'
import { getOfferSignature } from '@server/helpers/offer/get-offer-signature'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { NextResponse } from 'next/server'

export async function getOfferSignatureRequestHandler(req: ApiRequest<never>, id: string) {
  const user = await getUserFromRequest(req)
  const offer = await getOffer(id)
  assertOffer(offer)
  assertOfferSenderIs(offer, user.username)
  const offerSignature = await getOfferSignature(offer.id)
  assertOfferSignature(offerSignature)
  return NextResponse.json<OfferSignatureResponse>({ signature: offerSignature.signature })
}
