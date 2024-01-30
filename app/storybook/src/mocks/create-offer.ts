import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function createOffer(offerId: string) {
  return function (_args: CreateOfferRequest): Promise<OfferResponse> {
    return delayPromise(
      Promise.resolve({
        offer: getOfferMockById(offerId)
      }),
      800
    )
  }
}
