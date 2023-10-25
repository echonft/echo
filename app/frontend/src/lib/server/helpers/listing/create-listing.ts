import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type OfferItem } from '@echo/model/types/offer-item'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export async function createListing(items: NonEmptyArray<OfferItem>, targets: NonEmptyArray<ListingTarget>) {
  try {
    return await addListing(items, targets)
  } catch (e) {
    throw new ServerError(
      `error creating listing with items ${JSON.stringify(items)} and targets ${JSON.stringify(targets)}`,
      e
    )
  }
}
