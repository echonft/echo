import { type ApiRequest } from '@echo/api/types/api-request'
import type { CompleteOfferRequest } from '@echo/api/types/requests/complete-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { guarded_assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-sender-is'
import { guarded_assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-state'
import { guarded_completeOffer } from '@echo/frontend/lib/server/helpers/offer/guarded_complete-offer'
import { guarded_findOfferById } from '@echo/frontend/lib/server/helpers/offer/guarded_find-offer-by-id'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { completeOfferSchema } from '@echo/frontend/lib/server/validators/complete-offer-schema'
import { NextResponse } from 'next/server'

export async function completeOfferRequestHandler(req: ApiRequest<CompleteOfferRequest>, offerId: string) {
  const requestBody = await req.json()
  const { transactionId } = parseCompleteOfferRequest(requestBody)
  const offer = await guarded_findOfferById(offerId)
  guarded_assertOffer(offer)
  guarded_assertOfferState(offer, 'COMPLETED')
  const user = await getUserFromRequest(req)
  guarded_assertOfferSenderIs(offer, user.username)
  const updatedOffer = await guarded_completeOffer(offerId, transactionId)
  return NextResponse.json<OfferResponse>({ offer: updatedOffer })
}

function parseCompleteOfferRequest(request: CompleteOfferRequest) {
  try {
    return completeOfferSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing complete offer request ${JSON.stringify(request)}`, e)
  }
}
