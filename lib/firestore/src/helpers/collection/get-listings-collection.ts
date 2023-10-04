import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export function getListingsCollection() {
  return firestoreApp().collection(CollectionName.LISTINGS).withConverter(listingDataConverter)
}
