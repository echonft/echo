import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import type { Offer } from '@echo/model/types/offer'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { assoc, pipe } from 'ramda'

export function rejectOffer(): Promise<Offer> {
  return pipe(
    assoc('state', OfferState.Rejected),
    assoc('locked', true),
    toPromise,
    delayPromise(800)
  )(offerMockToJohnnycage)
}
