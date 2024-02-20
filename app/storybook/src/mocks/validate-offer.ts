import type { ValidateOfferArgs } from '@echo/api/types/fetchers/validate-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function validateOffer(_args: ValidateOfferArgs): Promise<OfferResponse> {
  return delayPromise(Promise.resolve({ offer: getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi') }), 800)
}
