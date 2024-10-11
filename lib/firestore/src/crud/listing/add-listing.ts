import { addListingOffersFromListing } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-listing'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { assertListingIsNotADuplicate } from '@echo/firestore/helpers/listing/assert/assert-listing-is-not-a-duplicate'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer/listing-offer-document-data'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { LISTING_STATE_OPEN } from '@echo/model/constants/listing-states'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import { assertItems } from '@echo/model/helpers/item/assert/assert-items'
import type { Expiration } from '@echo/model/types/expiration'
import type { Items } from '@echo/model/types/item'
import { type Listing } from '@echo/model/types/listing'
import { type ListingTarget } from '@echo/model/types/listing-target'
import type { Wallet } from '@echo/model/types/wallet'
import { nowMs } from '@echo/utils/helpers/now-ms'
import { pipe, toLower, toString } from 'ramda'

interface AddListingArgs {
  creator: UserDocumentData
  expiration: Expiration
  items: Items
  target: ListingTarget
  wallet: Wallet
}

export async function addListing(args: AddListingArgs): Promise<
  NewDocument<Listing> & {
    listingOffers: NewDocument<ListingOfferDocumentData>[]
  }
> {
  const { creator, wallet, items, target, expiration } = args
  assertItems(items)
  await assertListingIsNotADuplicate({ items, target })
  const data: Listing = {
    creator: getUserFromFirestoreData({ user: creator, wallet }),
    expiresAt: expirationToDateNumber(expiration),
    items,
    readOnly: false,
    slug: pipe(nowMs, toString, toLower<string>)(),
    state: LISTING_STATE_OPEN,
    target
  }
  const id = await setReference<Listing, ListingDocumentData>({
    collectionReference: getListingsCollectionReference(),
    data
  })
  // add listing offers (if any)
  const listingOffers = await addListingOffersFromListing(data)
  return { id, data, listingOffers }
}
