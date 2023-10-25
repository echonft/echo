import { type ApiRequest } from '@echo/api/types/api-request'
import type { CompleteOfferRequest } from '@echo/api/types/requests/complete-offer-request'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer'
import { assertOfferSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-sender-is'
import { assertOfferState } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-state'
import { completeOffer } from '@echo/frontend/lib/server/helpers/offer/complete-offer'
import { getOffer } from '@echo/frontend/lib/server/helpers/offer/get-offer'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { emptyResponse } from '@echo/frontend/lib/server/helpers/response/empty-response'
import { completeOfferSchema } from '@echo/frontend/lib/server/validators/complete-offer-schema'

export async function completeOfferRequestHandler(req: ApiRequest<CompleteOfferRequest>, offerId: string) {
  const requestBody = await req.json()
  const { transactionId } = parseCompleteOfferRequest(requestBody)
  const offer = await getOffer(offerId)
  assertOffer(offer)
  assertOfferState(offer, 'COMPLETED')
  const user = await getUserFromRequest(req)
  assertOfferSenderIs(offer, user.username)
  await completeOffer(offerId, transactionId)
  return emptyResponse()
}

function parseCompleteOfferRequest(request: CompleteOfferRequest) {
  try {
    return completeOfferSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing complete offer request ${JSON.stringify(request)}`, e)
  }
}
