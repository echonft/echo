import { CollectionName } from '../../constants/collection-name'
import { swapDataConverter } from '../../converters/swap-data-converter'
import { Swap } from '../../types/model/swap'
import { firestore } from 'firebase-admin'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export const getSwapSnapshotById = async (id: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.SWAPS)
    .where('id', '==', id)
    .withConverter(swapDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head<QueryDocumentSnapshot<Swap>>(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
