import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerPostDataConverter } from '@echo/firestore/converters/offer-post/offer-post-data-converter'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function findOfferPostByOfferId(offerId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.OFFER_POSTS)
    .withConverter(offerPostDataConverter)
    .where('offerId', '==', offerId)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
