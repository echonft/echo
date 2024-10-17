import { addListingOffersFromListing } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-listing'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import type { ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import type { Expiration } from '@echo/model/constants/expiration'
import { ListingState } from '@echo/model/constants/listing-state'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import { type Listing } from '@echo/model/types/listing/listing'
import type { User } from '@echo/model/types/user/user'
import { nowMs } from '@echo/utils/helpers/now-ms'
import { pipe, toLower, toString } from 'ramda'

interface AddListingArgs {
  creator: User
  expiration: Expiration
  items: Listing['items']
  target: Listing['target']
}

export async function addListing(args: AddListingArgs): Promise<
  NewDocument<Listing> & {
    listingOffers: NewDocument<ListingOfferDocumentData>[]
  }
> {
  const { creator, items, target, expiration } = args
  const data: Listing = {
    creator,
    expiresAt: expirationToDateNumber(expiration),
    items,
    readOnly: false,
    slug: pipe(nowMs, toString, toLower<string>)(),
    state: ListingState.Open,
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
