import { type ApiRequest } from '@echo/api/types/api-request'
import { type AcceptOfferRequest } from '@echo/api/types/requests/accept-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer'
import { assertOfferReceiverIs } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-receiver-is'
import { assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-state'
import { guarded_acceptOffer } from '@echo/frontend/lib/server/helpers/offer/guarded_accept-offer'
import { guarded_findOfferById } from '@echo/frontend/lib/server/helpers/offer/guarded_find-offer-by-id'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { acceptOfferSchema } from '@echo/frontend/lib/server/validators/accept-offer-schema'
import { NextResponse } from 'next/server'

export async function acceptOfferRequestHandler(req: ApiRequest<AcceptOfferRequest>, offerId: string) {
  const requestBody = await req.json()
  const { signature } = parseAcceptOfferRequest(requestBody)
  const offer = await guarded_findOfferById(offerId)
  assertOffer(offer)
  assertOfferState(offer, 'ACCEPTED')
  const user = await getUserFromRequest(req)
  assertOfferReceiverIs(offer, user.username)
  const updatedOffer = await guarded_acceptOffer(offerId, user.id, signature)
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}

function parseAcceptOfferRequest(request: AcceptOfferRequest) {
  try {
    return acceptOfferSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing accept offer request ${JSON.stringify(request)}`, e)
  }
}
