import { CollectionName } from '../constants/collection-name'
import { listingDataConverter } from '../converters/listing-data-converter'
import { firestore } from '../services/firestore'
import { DocumentChangeType, ListingComplete } from '@echo/firestore-types'

export function listenToListings(onChange: (changeType: DocumentChangeType, listing: ListingComplete) => unknown) {
  return firestore()
    .collection(CollectionName.LISTINGS)
    .withConverter(listingDataConverter)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        onChange(change.type, change.doc.data() as ListingComplete)
      })
    })
}
