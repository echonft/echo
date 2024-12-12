import { listingMock } from '@echo/model/mocks/listing-mock'
import type { Listing } from '@echo/model/types/listing'
import { rangeDelay } from 'delay'

export function createListing(): Promise<Listing> {
  return rangeDelay(800, 1600, { value: listingMock })
}
