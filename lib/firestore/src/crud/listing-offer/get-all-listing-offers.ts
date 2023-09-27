import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map } from 'ramda'

export async function getAllListingOffers() {
  const querySnapshot = await firestoreApp().collection(CollectionName.LISTING_OFFERS).get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreListingOffer[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreListingOffer[]
}
