import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { firestore } from '../../services/firestore'
import { Listing } from '@echo/firestore-types'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export const getListingSnapshotById = async (id: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.LISTINGS)
    .where('id', '==', id)
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<Listing>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
