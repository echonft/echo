import { CollectionName } from '@echo/firestore/constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { addListingOffersFromListing } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-listing'
import { assertListingItems } from '@echo/firestore/helpers/listing/assert/assert-listing-items'
import { assertListingTargets } from '@echo/firestore/helpers/listing/assert/assert-listing-targets'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import dayjs from 'dayjs'
import { head } from 'ramda'

export async function addListing(
  items: NonEmptyArray<FirestoreOfferItem>,
  targets: NonEmptyArray<FirestoreListingTarget>,
  skipListingOffers = false
): Promise<FirestoreListing> {
  assertListingTargets(targets)
  assertListingItems(items)
  const reference = firestoreApp().collection(CollectionName.LISTINGS).doc()
  const id = reference.id
  const newListing: FirestoreListing = {
    id,
    creator: head(items).nft.owner!,
    createdAt: dayjs(),
    expired: false,
    expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day'),
    items,
    state: 'OPEN',
    targets,
    updatedAt: dayjs()
  }
  await reference.set(listingDataConverter.toFirestore(newListing))
  // add listing offers (if any)
  if (!skipListingOffers) {
    await addListingOffersFromListing(newListing)
  }
  return newListing
}
