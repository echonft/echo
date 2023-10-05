import { findUserByDiscordId } from '@echo/firestore/crud/user/find-user-by-discord-id'
import { getAccountsCollection } from '@echo/firestore/helpers/collection/get-accounts-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { FirestoreAccount } from '@echo/firestore/types/model/account/firestore-account'
import { isNil } from 'ramda'

export async function updateAccount(userDiscordId: string, updateData: Partial<Omit<FirestoreAccount, 'id'>>) {
  const user = await findUserByDiscordId(userDiscordId)
  if (isNil(user)) {
    return
  }
  const querySnapshot = await getAccountsCollection().where('userId', '==', user.id).get()
  const documentSnapshot = getQuerySnapshotDocumentSnapshot(querySnapshot)
  if (isNil(documentSnapshot) || !documentSnapshot.exists) {
    return
  }
  await documentSnapshot.ref.update(updateData)
}
