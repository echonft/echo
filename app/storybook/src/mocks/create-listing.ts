import { listingMock } from '@echo/model/mocks/listing-mock'
import type { Listing } from '@echo/model/types/listing'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { pipe } from 'ramda'

export function createListing(): Promise<Listing> {
  return pipe(toPromise, delayPromise(800))(listingMock)
}
