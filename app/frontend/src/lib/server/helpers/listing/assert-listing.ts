import { BadRequestError } from '../error/bad-request-error'
import { Listing } from '@echo/firestore-types'
import { isNil } from 'ramda'

export function assertListing(listing: Listing | undefined): asserts listing is NonNullable<Listing> {
  if (isNil(listing)) {
    throw new BadRequestError()
  }
}
