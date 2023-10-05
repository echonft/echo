import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerPostDataConverter } from '@echo/firestore/converters/offer-post/offer-post-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export function getOfferPostsCollection() {
  return firestoreApp().collection(CollectionName.OFFER_POSTS).withConverter(offerPostDataConverter)
}
