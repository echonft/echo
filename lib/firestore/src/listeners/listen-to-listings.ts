import { getListingsCollection } from '@echo/firestore/helpers/collection/get-listings-collection'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'

export function listenToListings(onChange: (changeType: DocumentChangeType, listing: FirestoreListing) => unknown) {
  return getListingsCollection().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      onChange(change.type, change.doc.data())
    })
  })
}
