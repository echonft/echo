import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'

export function listenToListings(onChange: (changeType: DocumentChangeType, listing: FirestoreListing) => unknown) {
  return firestoreApp()
    .collection(CollectionName.LISTINGS)
    .withConverter(listingDataConverter)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        onChange(change.type, change.doc.data())
      })
    })
}
