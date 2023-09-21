import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertListing(listing: FirestoreListing | undefined): asserts listing is NonNullable<FirestoreListing> {
  if (isNil(listing)) {
    throw new BadRequestError('listing is nil')
  }
}
