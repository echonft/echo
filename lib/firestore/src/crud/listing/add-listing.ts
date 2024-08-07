import { addListingOffersFromListing } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-listing'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { assertListingIsNotADuplicate } from '@echo/firestore/helpers/listing/assert/assert-listing-is-not-a-duplicate'
import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { LISTING_STATE_OPEN } from '@echo/model/constants/listing-states'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import { assertItems } from '@echo/model/helpers/item/assert/assert-items'
import type { Expiration } from '@echo/model/types/expiration'
import { type Listing } from '@echo/model/types/listing'
import { type ListingTarget } from '@echo/model/types/listing-target'
import type { OwnedNft } from '@echo/model/types/nft'
import { nowMs } from '@echo/utils/helpers/now-ms'
import { head, pipe, toLower, toString } from 'ramda'

interface AddListingArgs {
  items: OwnedNft[]
  target: ListingTarget
  expiration: Expiration
}

export async function addListing(args: AddListingArgs): Promise<
  NewDocument<Listing> & {
    listingOffers: NewDocument<ListingOffer>[]
  }
> {
  const { items, target, expiration } = args
  assertItems(items)
  await assertListingIsNotADuplicate({ items, target })
  const data: Listing = {
    creator: head(items).owner,
    expiresAt: expirationToDateNumber(expiration),
    items,
    readOnly: false,
    slug: pipe(nowMs, toString, toLower<string>)(),
    state: LISTING_STATE_OPEN,
    target
  }
  const id = await setReference<Listing>({
    collectionReference: getListingsCollectionReference(),
    data
  })
  // add listing offers (if any)
  const listingOffers = await addListingOffersFromListing(data)
  return { id, data, listingOffers }
}
