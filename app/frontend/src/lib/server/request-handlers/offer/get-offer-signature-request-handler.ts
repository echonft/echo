import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { guarded_assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-sender-is'
import { guarded_assertOfferSignature } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-signature'
import { guarded_findOfferById } from '@echo/frontend/lib/server/helpers/offer/guarded_find-offer-by-id'
import { guarded_findOfferSignature } from '@echo/frontend/lib/server/helpers/offer/guarded_find-offer-signature'
import { guarded_getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request'
import { NextResponse } from 'next/server'

export async function getOfferSignatureRequestHandler(req: ApiRequest<never>, id: string) {
  const user = await guarded_getUserFromRequest(req)
  const offer = await guarded_findOfferById(id)
  guarded_assertOffer(offer)
  guarded_assertOfferSenderIs(offer, user.username)
  const offerSignature = await guarded_findOfferSignature(offer.id)
  guarded_assertOfferSignature(offerSignature)
  return NextResponse.json<OfferSignatureResponse>({ signature: offerSignature.signature })
}
