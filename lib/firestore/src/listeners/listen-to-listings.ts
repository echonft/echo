import { CollectionName } from '../constants/collection-name'
import { listingDataConverter } from '../converters/listing-data-converter'
import { firestore } from '../services/firestore'
import { DocumentChangeType } from '../types/abstract/document-change-type'
import { Listing } from '../types/model/listing'

export function listenToListings(onChange: (changeType: DocumentChangeType, listing: Listing) => unknown) {
  return firestore()
    .collection(CollectionName.LISTINGS)
    .withConverter(listingDataConverter)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        onChange(change.type, change.doc.data())
      })
    })
}
