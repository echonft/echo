import { CollectionName } from '@echo/firestore/constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { addListingToOffer } from '@echo/firestore/crud/offer/add-listing-to-offer'
import { getOffersForListing } from '@echo/firestore/crud/offer/get-offers-for-listing'
import { assertListingItems } from '@echo/firestore/helpers/listing/assert/assert-listing-items'
import { assertListingTargets } from '@echo/firestore/helpers/listing/assert/assert-listing-targets'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreListingItem } from '@echo/firestore/types/model/firestore-listing-item'
import { FirestoreListingTarget } from '@echo/firestore/types/model/firestore-listing-target'
import { FirestoreUserDetails } from '@echo/firestore/types/model/firestore-user-details'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import dayjs from 'dayjs'
import { assoc, map, pipe, prop } from 'ramda'

interface NewListing {
  creator: Partial<FirestoreUserDetails>
  items: NonEmptyArray<FirestoreListingItem>
  targets: NonEmptyArray<FirestoreListingTarget>
}

export async function addListing(listing: NewListing): Promise<string> {
  assertListingTargets(listing.targets)
  assertListingItems(listing.items)
  const reference = firestoreApp().collection(CollectionName.LISTINGS).doc()
  const id = reference.id
  const offers = await getOffersForListing(listing.items, listing.targets)
  const newListing = pipe(
    assoc('id', id),
    assoc('createdAt', dayjs()),
    assoc('expiresAt', dayjs().add(DEFAULT_EXPIRATION_TIME, 'day')),
    assoc('offersIds', map(prop('id'), offers)),
    assoc('state', 'OPEN')
  )(listing)
  await reference.set(listingDataConverter.toFirestore(newListing))
  // add listing to the offers (if any)
  for (const offer of offers) {
    await addListingToOffer(offer, id)
  }
  return id
}
