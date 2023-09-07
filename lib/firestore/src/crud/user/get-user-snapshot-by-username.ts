import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'
import { User } from '@echo/firestore-types'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export async function getUserSnapshotByUsername(username: string) {
  const querySnapshot = await firestore()
    .collection(CollectionName.USERS)
    .where('username', '==', username)
    .withConverter(userDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<User>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
