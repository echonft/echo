import type { CancelOfferArgs } from '@echo/api/types/fetchers/cancel-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { OFFER_STATE_CANCELLED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { applySpec, assoc, pipe } from 'ramda'

export function cancelOffer(_args: CancelOfferArgs): Promise<OfferResponse> {
  return delayPromise(
    pipe<[string], OfferResponse, Promise<OfferResponse>>(
      applySpec<OfferResponse>({
        offer: pipe<[string], Offer, Offer, Offer>(
          getOfferMockById,
          assoc('state', OFFER_STATE_CANCELLED),
          assoc('readOnly', true)
        )
      }),
      toPromise
    ),
    800
  )(offerMockToJohnnycageId())
}
