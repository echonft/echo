import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerDataConverter } from '@echo/firestore/converters/offer-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map } from 'ramda'

export async function getOffersWithListingId(listingId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.OFFERS)
    .where('listingsIds', 'array-contains', listingId)
    .withConverter(offerDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreOffer[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreOffer[]
}
