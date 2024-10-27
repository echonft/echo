import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { objOf, pipe } from 'ramda'

export function createListing(): Promise<ListingResponse> {
  return pipe(objOf('listing'), toPromise, delayPromise(800))(listingMock)
}
