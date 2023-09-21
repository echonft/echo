import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { isNil } from 'ramda'

export function assertListing(
  listing: Partial<FirestoreListing> | undefined
): asserts listing is NonNullable<Partial<FirestoreListing>> {
  if (isNil(listing)) {
    throw Error('listing is not defined')
  }
  if (propIsNil('id', listing)) {
    throw Error('listing does not have an id')
  }
}
