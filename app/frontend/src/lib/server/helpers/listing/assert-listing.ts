import type { Listing } from '@echo/model/types/listing'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertListing(listing: Listing | undefined): asserts listing is NonNullable<Listing> {
  if (isNil(listing)) {
    throw new BadRequestError('listing is nil')
  }
}
