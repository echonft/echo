import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { firestore } from '../../services/firestore'
import { Listing } from '../../types/model/listing'
import { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head, invoker, isNil, map } from 'ramda'

export async function getListingsForCreator(userId: string) {
  const querySnapshot = await firestore()
    .collection(CollectionName.LISTINGS)
    .where('creatorId', '==', userId)
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as Listing[]
  }

  const documentSnapshot = head<QueryDocumentSnapshot<Listing>>(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return [] as Listing[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as Listing[]
}
