import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { FirestoreListingComplete } from '@echo/firestore/types/model/firestore-listing-complete'

export function listenToListings(
  onChange: (changeType: DocumentChangeType, listing: FirestoreListingComplete) => unknown
) {
  return firestoreApp()
    .collection(CollectionName.LISTINGS)
    .withConverter(listingDataConverter)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        onChange(change.type, change.doc.data() as FirestoreListingComplete)
      })
    })
}
