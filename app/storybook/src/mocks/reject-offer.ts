import type { RejectOfferArgs } from '@echo/api/types/fetchers/reject-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { always, applySpec, assoc, pipe } from 'ramda'

export function rejectOffer(_args: RejectOfferArgs): Promise<OfferResponse> {
  return delayPromise(
    pipe<[], string, OfferResponse, Promise<OfferResponse>>(
      always('LyCfl6Eg7JKuD7XJ6IPi'),
      applySpec<OfferResponse>({
        offer: pipe<[string], Offer, Offer, Offer>(
          getOfferMockById,
          assoc('state', OFFER_STATE_REJECTED),
          assoc('readOnly', true)
        )
      }),
      toPromise
    ),
    800
  )()
}
