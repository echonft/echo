import type { CancelOfferArgs } from '@echo/api/types/fetchers/cancel-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { OFFER_STATE_CANCELLED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { assoc, pipe } from 'ramda'

export function cancelOffer(_args: CancelOfferArgs): Promise<OfferResponse> {
  return delayPromise(
    Promise.resolve({
      offer: pipe<[string], Offer, Offer, Offer>(
        getOfferMockById,
        assoc('state', OFFER_STATE_CANCELLED),
        assoc('readOnly', true)
      )('LyCfl6Eg7JKuD7XJ6IPi')
    }),
    800
  )
}
