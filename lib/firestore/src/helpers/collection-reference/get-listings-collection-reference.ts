import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export function getListingsCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.LISTINGS).withConverter(listingDataConverter)
}
