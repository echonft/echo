import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerPostDataConverter } from '@echo/firestore/converters/offer-post/offer-post-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreOfferPost } from '@echo/firestore/types/model/offer-post/firestore-offer-post'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function getOfferPostSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.OFFER_POSTS)
    .withConverter(offerPostDataConverter)
    .where('id', '==', id)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  return head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreOfferPost>
}
