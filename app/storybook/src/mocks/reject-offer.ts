import type { RejectOfferArgs } from '@echo/api/types/fetchers/reject-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { assoc, pipe } from 'ramda'

export function rejectOffer(_args: RejectOfferArgs): Promise<OfferResponse> {
  return delayPromise(
    Promise.resolve({
      offer: pipe<[string], Offer, Offer, Offer>(
        getOfferMockById,
        assoc('state', OFFER_STATE_REJECTED),
        assoc('readOnly', true)
      )('LyCfl6Eg7JKuD7XJ6IPi')
    }),
    800
  )
}
