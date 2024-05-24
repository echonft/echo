import { addListingOffersFromListing } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-listing'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { assertListingIsNotADuplicate } from '@echo/firestore/helpers/listing/assert/assert-listing-is-not-a-duplicate'
import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import { LISTING_STATE_OPEN } from '@echo/model/constants/listing-states'
import { assertItems } from '@echo/model/helpers/item/assert/assert-items'
import { type Listing } from '@echo/model/types/listing'
import { type ListingTarget } from '@echo/model/types/listing-target'
import type { Nft } from '@echo/model/types/nft'
import { now } from '@echo/utils/helpers/now'
import { nowMs } from '@echo/utils/helpers/now-ms'
import dayjs from 'dayjs'
import { head, pipe, toLower, toString } from 'ramda'

interface AddListingArgs {
  items: Nft[]
  target: ListingTarget
}

export async function addListing(args: AddListingArgs): Promise<
  NewDocument<Listing> & {
    listingOffers: NewDocument<ListingOffer>[]
  }
> {
  const { items, target } = args
  assertItems(items)
  await assertListingIsNotADuplicate({ items, target })
  const data: Listing = {
    creator: head(items).owner,
    createdAt: now(),
    expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix(),
    items,
    readOnly: false,
    slug: pipe(nowMs, toString, toLower<string>)(),
    state: LISTING_STATE_OPEN,
    target,
    updatedAt: now()
  }
  const id = await setReference<Listing>({
    collectionReference: getListingsCollectionReference(),
    data
  })
  // add listing offers (if any)
  const listingOffers = await addListingOffersFromListing(data)
  return { id, data, listingOffers }
}
