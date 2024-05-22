import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { type Listing } from '@echo/model/types/listing'
import { type DocumentChange, type DocumentChangeType } from 'firebase-admin/firestore'

export function listenToListings(onChange: (changeType: DocumentChangeType, listing: Listing) => unknown) {
  getListingsCollectionReference().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change: DocumentChange<Listing, ListingDocumentData>) => {
      onChange(change.type, change.doc.data())
    })
  })
}
