import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { invoker, map } from 'ramda'

export async function getAllListings() {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTINGS)
    .withConverter(listingDataConverter)
    .get()
  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreListing[]
}
