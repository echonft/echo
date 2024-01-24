import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { addListingOffersFromListing } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-listing'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { assertListingIsNotADuplicate } from '@echo/firestore/helpers/listing/assert/assert-listing-is-not-a-duplicate'
import { LISTING_STATE_OPEN } from '@echo/model/constants/listing-states'
import { assertListingItems } from '@echo/model/helpers/listing/assert/assert-listing-items'
import { assertListingTargets } from '@echo/model/helpers/listing/assert/assert-listing-targets'
import { type Listing } from '@echo/model/types/listing'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type OfferItem } from '@echo/model/types/offer-item'
import { now } from '@echo/utils/helpers/now'
import dayjs from 'dayjs'
import { head, pipe } from 'ramda'

export async function addListing(items: OfferItem[], targets: ListingTarget[]): Promise<Listing> {
  assertListingTargets(targets)
  assertListingItems(items)
  await assertListingIsNotADuplicate(items, targets)
  const newListing: Listing = await pipe(
    getListingsCollectionReference,
    setReference({
      creator: head(items).nft.owner,
      createdAt: now(),
      expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix(),
      items,
      readOnly: false,
      state: LISTING_STATE_OPEN,
      targets,
      updatedAt: now()
    })
  )()
  // add listing offers (if any)
  await addListingOffersFromListing(newListing)
  return newListing
}
