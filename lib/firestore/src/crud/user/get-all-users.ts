import { CollectionName } from '@echo/firestore/constants/collection-name'
import { userDataConverter } from '@echo/firestore/converters/user-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import { invoker, map } from 'ramda'

export async function getAllUsers() {
  const querySnapshot = await firestoreApp().collection(CollectionName.USERS).withConverter(userDataConverter).get()
  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreUser[]
}
