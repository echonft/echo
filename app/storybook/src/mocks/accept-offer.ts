import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { assoc, pipe } from 'ramda'

export function acceptOffer(_args: AcceptOfferArgs): Promise<OfferResponse> {
  return delayPromise(
    Promise.resolve({
      offer: pipe<[string], Offer, Offer, Offer>(
        getOfferMockById,
        assoc('state', OFFER_STATE_ACCEPTED),
        assoc('readOnly', false)
      )('LyCfl6Eg7JKuD7XJ6IPi')
    }),
    800
  )
}
