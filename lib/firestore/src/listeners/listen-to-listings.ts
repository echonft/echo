import { CollectionName } from '../constants/collection-name'
import { listingDataConverter } from '../converters/listing-data-converter'
import { firestore } from '../services/firestore'
import { Listing } from '../types/model/listing'
import { DocumentChange } from 'firebase-admin/firestore'
import { invoker, map } from 'ramda'

export function listenToListings(onChange: (listings: Listing[], changes: DocumentChange<Listing>[]) => unknown) {
  return firestore()
    .collection(CollectionName.LISTINGS)
    .withConverter(listingDataConverter)
    .onSnapshot((snapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      onChange(map(invoker(0, 'data'), snapshot.docs), snapshot.docChanges())
    })
}
