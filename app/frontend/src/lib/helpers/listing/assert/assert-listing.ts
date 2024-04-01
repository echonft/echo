import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { type Listing } from '@echo/model/types/listing'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function assertListing(listing: Nullable<Listing>): asserts listing is NonNullable<Listing> {
  if (isNil(listing)) {
    throw new BadRequestError('listing is nil')
  }
}
