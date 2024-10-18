import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { OfferState } from '@echo/model/constants/offer-state'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Offer } from '@echo/model/types/offer/offer'
import type { WithSlug } from '@echo/model/types/with-slug'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { always, applySpec, assoc, pipe } from 'ramda'

export function rejectOffer(_args: WithSlug): Promise<OfferResponse> {
  return delayPromise(
    pipe<[], string, OfferResponse, Promise<OfferResponse>>(
      always(offerMockToJohnnycageId()),
      applySpec<OfferResponse>({
        offer: pipe<[string], Offer, Offer, Offer>(
          getOfferMockById,
          assoc('state', OfferState.Rejected),
          assoc('readOnly', true)
        )
      }),
      toPromise
    ),
    800
  )()
}
