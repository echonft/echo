import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import { type Listing } from '@echo/model/types/listing'

export function listenToListings(onChange: (changeType: DocumentChangeType, listing: Listing) => unknown) {
  return getListingsCollectionReference().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      onChange(change.type, change.doc.data())
    })
  })
}
