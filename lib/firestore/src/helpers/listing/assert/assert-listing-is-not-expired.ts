import { dateIsPast } from '@echo/firestore/helpers/converters/from-firestore/date-is-past'
import { assertListing } from '@echo/firestore/helpers/listing/assert/assert-listing'
import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { pipe, prop } from 'ramda'

export function assertListingIsNotExpired(
  listing: Partial<Partial<FirestoreListing>> | undefined
): asserts listing is NonNullable<Partial<FirestoreListing>> {
  assertListing(listing)
  if (propIsNil('expired', listing)) {
    // try with the date
    if (propIsNil('expiresAt', listing)) {
      throw Error('listing is missing expiration date')
    }
    if (pipe(prop('expiresAt'), dateIsPast)(listing)) {
      throw Error('listing is expired')
    }
  }
  if (listing.expired) {
    throw Error('listing is expired')
  }
}
