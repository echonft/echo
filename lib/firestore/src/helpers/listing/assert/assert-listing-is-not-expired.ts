import { dateNumberIsPast } from '@echo/firestore/helpers/converters/from-firestore/date-number-is-past'
import { assertListing } from '@echo/firestore/helpers/listing/assert/assert-listing'
import type { Listing } from '@echo/model/types/listing'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { pipe, prop } from 'ramda'

export function assertListingIsNotExpired(listing: Listing | undefined): asserts listing is NonNullable<Listing> {
  assertListing(listing)
  if (propIsNil('expired', listing)) {
    // try with the date
    if (propIsNil('expiresAt', listing)) {
      throw Error('listing is missing expiration date')
    }
    if (pipe(prop('expiresAt'), dateNumberIsPast)(listing)) {
      throw Error('listing is expired')
    }
  }
  if (listing.expired) {
    throw Error('listing is expired')
  }
}
