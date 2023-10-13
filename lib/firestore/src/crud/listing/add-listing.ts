import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { addListingOffersFromListing } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-listing'
import { getListingsCollection } from '@echo/firestore/helpers/collection/get-listings-collection'
import { assertListingIsNotADuplicate } from '@echo/firestore/helpers/listing/assert/assert-listing-is-not-a-duplicate'
import { assertListingItems } from '@echo/firestore/helpers/listing/assert/assert-listing-items'
import { assertListingTargets } from '@echo/firestore/helpers/listing/assert/assert-listing-targets'
import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import dayjs from 'dayjs'
import { head } from 'ramda'

export async function addListing(
  items: NonEmptyArray<OfferItem>,
  targets: NonEmptyArray<ListingTarget>
): Promise<Listing> {
  assertListingTargets(targets)
  assertListingItems(items)
  await assertListingIsNotADuplicate(items, targets)
  const reference = getListingsCollection().doc()
  const id = reference.id
  const now = dayjs().unix()
  const newListing: Listing = {
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
  await addListingOffersFromListing(newListing)
  return newListing
}
