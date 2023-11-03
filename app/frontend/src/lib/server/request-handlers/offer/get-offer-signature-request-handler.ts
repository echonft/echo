import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer'
import { assertOfferSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-sender-is'
import { assertOfferSignature } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-signature'
import { guarded_findOfferById } from '@echo/frontend/lib/server/helpers/offer/guarded_find-offer-by-id'
import { guarded_findOfferSignature } from '@echo/frontend/lib/server/helpers/offer/guarded_find-offer-signature'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { NextResponse } from 'next/server'

export async function getOfferSignatureRequestHandler(req: ApiRequest<never>, id: string) {
  const user = await getUserFromRequest(req)
  const offer = await guarded_findOfferById(id)
  assertOffer(offer)
  assertOfferSenderIs(offer, user.username)
  const offerSignature = await guarded_findOfferSignature(offer.id)
  assertOfferSignature(offerSignature)
  return NextResponse.json<OfferSignatureResponse>({ signature: offerSignature.signature })
}
