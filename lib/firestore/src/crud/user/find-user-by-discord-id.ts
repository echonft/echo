import { CollectionName } from '@echo/firestore/constants/collection-name'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import type { QuerySnapshot } from 'firebase-admin/lib/firestore'

export async function findUserByDiscordId(discordId: string) {
  const querySnapshot = await firestoreApp().collection(CollectionName.USERS).where('discord.id', '==', discordId).get()
  return getQuerySnapshotDocumentData(querySnapshot as QuerySnapshot<FirestoreUser>)
}
