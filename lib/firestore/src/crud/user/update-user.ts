import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { findUserByDiscordId } from '@echo/firestore/crud/user/find-user-by-discord-id'
import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { User } from '@echo/firestore/types/model/user/user'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { assoc, isNil, mergeDeepLeft } from 'ramda'

export async function updateUser(data: Pick<UserDocumentData, 'discord'>): Promise<User> {
  const existingUser = await findUserByDiscordId(data.discord.id)
  if (isNil(existingUser)) {
    const reference = firestoreApp().collection(CollectionReferenceName.USERS).doc()
    await reference.set(assoc('username', data.discord.username, data))
    return (await findUserById(reference.id))!
  }
  const reference = firestoreApp().collection(CollectionReferenceName.USERS).doc(existingUser.id)
  await reference.update(data)
  return mergeDeepLeft(data, existingUser)
}
