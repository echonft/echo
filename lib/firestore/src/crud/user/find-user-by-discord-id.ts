import { CollectionName } from '@echo/firestore/constants/collection-name'
import { userDataConverter } from '@echo/firestore/converters/user-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head, isNil } from 'ramda'

export async function findUserByDiscordId(discordId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.USERS)
    .where('discordId', '==', discordId)
    .withConverter(userDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreUser>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot.data()
}
