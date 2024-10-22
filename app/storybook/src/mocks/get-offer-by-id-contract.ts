import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { objOf, pipe } from 'ramda'

export function getOfferByIdContract(): Promise<OfferResponse> {
  return pipe(offerMockFromJohnnycageId, getOfferMockById, objOf('offer'), toPromise, delayPromise(800))()
}
