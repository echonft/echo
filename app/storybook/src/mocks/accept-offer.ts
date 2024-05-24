import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { applySpec, assoc, pipe } from 'ramda'

export function acceptOffer(_args: AcceptOfferArgs): Promise<OfferResponse> {
  return delayPromise(
    pipe<[string], OfferResponse, Promise<OfferResponse>>(
      applySpec<OfferResponse>({
        offer: pipe<[string], Offer, Offer, Offer>(
          getOfferMockById,
          assoc('state', OFFER_STATE_ACCEPTED),
          assoc('readOnly', false)
        )
      }),
      toPromise
    ),
    800
  )(OFFER_MOCK_TO_JOHNNYCAGE_ID)
}
