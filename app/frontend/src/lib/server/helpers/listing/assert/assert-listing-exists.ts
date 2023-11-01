import { NotFoundError } from '@echo/frontend/lib/server/helpers/error/not-found-error'
import { type Listing } from '@echo/model/types/listing'
import { isNil } from 'ramda'

export function assertListingExists(
  listing: Listing | undefined,
  listingId: string
): asserts listing is NonNullable<Listing> {
  if (isNil(listing)) {
    throw new NotFoundError(`listing with id ${listingId} not found`)
  }
}
