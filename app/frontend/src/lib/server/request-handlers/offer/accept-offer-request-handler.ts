import { type ApiRequest } from '@echo/api/types/api-request'
import { type AcceptOfferRequest } from '@echo/api/types/requests/accept-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { guarded_assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferReceiverIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-receiver-is'
import { guarded_assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-state'
import { guarded_acceptOffer } from '@echo/frontend/lib/server/helpers/offer/guarded_accept-offer'
import { guarded_findOfferById } from '@echo/frontend/lib/server/helpers/offer/guarded_find-offer-by-id'
import { guarded_getResquestBody } from '@echo/frontend/lib/server/helpers/request/guarded_get-resquest-body'
import { guarded_getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request'
import { acceptOfferSchema } from '@echo/frontend/lib/server/validators/accept-offer-schema'
import { NextResponse } from 'next/server'

function guarded_parseAcceptOfferRequest(request: AcceptOfferRequest) {
  try {
    return acceptOfferSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing accept offer request ${JSON.stringify(request)}`, e)
  }
}

export async function acceptOfferRequestHandler(req: ApiRequest<AcceptOfferRequest>, offerId: string) {
  const requestBody = await guarded_getResquestBody(req)
  const { signature } = guarded_parseAcceptOfferRequest(requestBody)
  const offer = await guarded_findOfferById(offerId)
  guarded_assertOffer(offer)
  guarded_assertOfferState(offer, 'ACCEPTED')
  const user = await guarded_getUserFromRequest(req)
  guarded_assertOfferReceiverIs(offer, user.username)
  const updatedOffer = await guarded_acceptOffer(offerId, user.id, signature)
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}
