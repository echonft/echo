import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model-mocks/offer/offer-mock'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { applySpec, pipe } from 'ramda'

export function createOffer(_args: CreateOfferRequest): Promise<OfferResponse> {
  return delayPromise(
    pipe<[string], OfferResponse, Promise<OfferResponse>>(
      applySpec<OfferResponse>({
        offer: getOfferMockById
      }),
      toPromise
    ),
    800
  )(offerMockToJohnnycageId())
}
