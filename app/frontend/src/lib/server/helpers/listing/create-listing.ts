import { addListing } from '@echo/firestore/crud/listing/add-listing'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/firestore-listing-target'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/firestore-offer-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { ServerError } from '@server/helpers/error/server-error'

export async function createListing(
  items: NonEmptyArray<FirestoreOfferItem>,
  targets: NonEmptyArray<FirestoreListingTarget>
) {
  try {
    return await addListing(items, targets)
  } catch (e) {
    throw new ServerError(
      `error creating listing with items ${JSON.stringify(items)} and targets ${JSON.stringify(targets)}`,
      e
    )
  }
}
