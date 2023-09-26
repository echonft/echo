import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function getListingOfferSnapshotById(id: string) {
  const querySnapshot = await firestoreApp().collection(CollectionName.LISTING_OFFERS).where('id', '==', id).get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  return head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreListingOffer>
}
