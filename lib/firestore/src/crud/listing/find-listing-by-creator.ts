import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { firestore } from '../../services/firestore'
import { Listing } from '../../types/model/listing'
import { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head, isNil } from 'ramda'

export async function findListingByCreator(userId: string) {
  const querySnapshot = await firestore()
    .collection(CollectionName.LISTINGS)
    .where('creatorId', '==', userId)
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head<QueryDocumentSnapshot<Listing>>(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot.data()
}
