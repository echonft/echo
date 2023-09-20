import { CollectionName } from '@echo/firestore/constants/collection-name'
import { userDataConverter } from '@echo/firestore/converters/user-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function getUserSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.USERS)
    .where('id', '==', id)
    .withConverter(userDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  return head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreUser>
}
