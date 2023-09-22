import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerPostDataConverter } from '@echo/firestore/converters/offer-post/offer-post-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreOfferPost } from '@echo/firestore/types/model/offer-post/firestore-offer-post'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map } from 'ramda'

export async function getAllOfferPosts() {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.OFFER_POSTS)
    .withConverter(offerPostDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreOfferPost[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreOfferPost[]
}
