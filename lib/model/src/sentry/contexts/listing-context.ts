import type { Listing } from '@echo/model/types/listing'

const LISTING_CONTEXT_NAME = 'listing'
export function listingContext(listing: Partial<Listing>) {
  return {
    [LISTING_CONTEXT_NAME]: listing
  }
}
