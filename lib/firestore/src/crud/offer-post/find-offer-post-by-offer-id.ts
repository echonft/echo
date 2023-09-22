import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerPostDataConverter } from '@echo/firestore/converters/offer-post/offer-post-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreOfferPost } from '@echo/firestore/types/model/offer-post/firestore-offer-post'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function findOfferPostByOfferId(offerId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.OFFER_POSTS)
    .withConverter(offerPostDataConverter)
    .where('offerId', '==', offerId)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  return (head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreOfferPost>).data()
}
