import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { User } from '../../types/model/user'
import { firestore } from 'firebase-admin'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export const getUserSnapshotById = async (id: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.USERS)
    .where('id', '==', id)
    .withConverter(userDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head<QueryDocumentSnapshot<User>>(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
