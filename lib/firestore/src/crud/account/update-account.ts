import { CollectionName } from '@echo/firestore/constants/collection-name'
import { findUserByDiscordId } from '@echo/firestore/crud/user/find-user-by-discord-id'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreAccount } from '@echo/firestore/types/model/account/firestore-account'
import { isNil } from 'ramda'

export async function updateAccount(userDiscordId: string, updateData: Partial<FirestoreAccount>) {
  const user = await findUserByDiscordId(userDiscordId)
  if (isNil(user)) {
    return
  }
  const querySnapshot = await firestoreApp().collection(CollectionName.ACCOUNTS).where('userId', '==', user.id).get()
  const documentSnapshot = getQuerySnapshotDocumentSnapshot(querySnapshot)
  if (isNil(documentSnapshot) || !documentSnapshot.exists) {
    return
  }
  await documentSnapshot.ref.update(updateData)
}
