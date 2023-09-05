import { dateIsPast } from '../../converters/from-firestore/date-is-past'
import { assertListing } from './assert-listing'
import { Listing } from '@echo/firestore-types'
import { propIsNil } from '@echo/utils'
import { pipe, prop } from 'ramda'

export function assertListingIsNotExpired(
  listing: Partial<Partial<Listing>> | undefined
): asserts listing is NonNullable<Partial<Listing>> {
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
