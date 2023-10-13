import { getListingsCollection } from '@echo/firestore/helpers/collection/get-listings-collection'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { Listing } from '@echo/model/types/listing'

export function listenToListings(onChange: (changeType: DocumentChangeType, listing: Listing) => unknown) {
  return getListingsCollection().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      onChange(change.type, change.doc.data())
    })
  })
}
