import type { ValidateOfferArgs } from '@echo/api/types/fetchers/validate-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { applySpec, pipe } from 'ramda'

export function validateOffer(_args: ValidateOfferArgs): Promise<OfferResponse> {
  return delayPromise(
    pipe<[string], OfferResponse, Promise<OfferResponse>>(
      applySpec<OfferResponse>({
        offer: getOfferMockById
      }),
      toPromise
    ),
    800
  )(OFFER_MOCK_TO_JOHNNYCAGE_ID)
}
