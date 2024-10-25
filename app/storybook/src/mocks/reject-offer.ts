import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import type { Slug } from '@echo/model/types/slug'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { assoc, objOf, pipe } from 'ramda'

export function rejectOffer(_args: Record<'slug', Slug>): Promise<OfferResponse> {
  return pipe(
    assoc('state', OfferState.Rejected),
    assoc('locked', true),
    objOf('offer'),
    toPromise,
    delayPromise(800)
  )(offerMockToJohnnycage)
}
