import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { offerMockFromJohnnycage } from '@echo/model/mocks/offer-mock'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { objOf, pipe } from 'ramda'

export function getOfferByIdContract(): Promise<OfferResponse> {
  return pipe(objOf('offer'), toPromise, delayPromise(800))(offerMockFromJohnnycage)
}
