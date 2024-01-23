import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { type Listing } from '@echo/model/types/listing'
import { isNil } from 'ramda'

export function guarded_assertListing(listing: Listing | undefined): asserts listing is NonNullable<Listing> {
  if (isNil(listing)) {
    throw new BadRequestError('listing is nil')
  }
}
