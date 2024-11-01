import { offerMockFromJohnnycage } from '@echo/model/mocks/offer-mock'
import type { Offer } from '@echo/model/types/offer'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { pipe } from 'ramda'

export function getOfferByIdContract(): Promise<Offer> {
  return pipe(toPromise, delayPromise(800))(offerMockFromJohnnycage)
}
