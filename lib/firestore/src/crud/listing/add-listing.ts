import { CollectionName } from '@echo/firestore/constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { addListingToOffer } from '@echo/firestore/crud/offer/add-listing-to-offer'
import { getOffersForListing } from '@echo/firestore/crud/offer/get-offers-for-listing'
import { assertListingItems } from '@echo/firestore/helpers/listing/assert/assert-listing-items'
import { assertListingTargets } from '@echo/firestore/helpers/listing/assert/assert-listing-targets'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreListingTarget } from '@echo/firestore/types/model/firestore-listing-target'
import { FirestoreOfferItem } from '@echo/firestore/types/model/firestore-offer-item'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import dayjs from 'dayjs'
import { head, map, prop } from 'ramda'

export async function addListing(
  items: NonEmptyArray<FirestoreOfferItem>,
  targets: NonEmptyArray<FirestoreListingTarget>
): Promise<string> {
  assertListingTargets(targets)
  assertListingItems(items)
  const reference = firestoreApp().collection(CollectionName.LISTINGS).doc()
  const id = reference.id
  const offers = await getOffersForListing(items, targets)
  await reference.set(
    listingDataConverter.toFirestore({
      id,
      creator: head(items).nft.owner,
      createdAt: dayjs(),
      expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day'),
      items,
      offersIds: map(prop('id'), offers),
      state: 'OPEN',
      targets
    })
  )
  // add listing to the offers (if any)
  for (const offer of offers) {
    await addListingToOffer(offer, id)
  }
  return id
}
