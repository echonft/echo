import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { addListingOffersFromListing } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-listing'
import { getListingsCollection } from '@echo/firestore/helpers/collection/get-listings-collection'
import { assertListingItems } from '@echo/firestore/helpers/listing/assert/assert-listing-items'
import { assertListingTargets } from '@echo/firestore/helpers/listing/assert/assert-listing-targets'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import dayjs from 'dayjs'
import { head } from 'ramda'

export async function addListing(
  items: NonEmptyArray<FirestoreOfferItem>,
  targets: NonEmptyArray<FirestoreListingTarget>,
  skipListingOffers = false
): Promise<FirestoreListing> {
  assertListingTargets(targets)
  assertListingItems(items)
  const reference = getListingsCollection().doc()
  const id = reference.id
  const now = dayjs().unix()
  const newListing: FirestoreListing = {
    id,
    creator: head(items).nft.owner,
    createdAt: now,
    expired: false,
    expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix(),
    items,
    state: 'OPEN',
    targets,
    updatedAt: now
  }
  await reference.set(newListing)
  // add listing offers (if any)
  if (!skipListingOffers) {
    await addListingOffersFromListing(newListing)
  }
  return newListing
}
