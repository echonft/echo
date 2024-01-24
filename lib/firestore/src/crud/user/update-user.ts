import { findUserByDiscordId } from '@echo/firestore/crud/user/find-user-by-discord-id'
import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { now } from '@echo/utils/helpers/now'
import { always, isNil, mergeDeepLeft, pipe } from 'ramda'

export async function updateUser(data: Pick<UserDocumentData, 'discord'>): Promise<UserDocumentData> {
  const existingUser = await findUserByDiscordId(data.discord.id)
  if (isNil(existingUser)) {
    return pipe(
      getUsersCollectionReference,
      setReference({ ...data, username: data.discord.username, createdAt: now(), updatedAt: now() })
    )()
  }
  return pipe(
    getUsersCollectionReference,
    updateReference(existingUser.id, data),
    always(mergeDeepLeft(data, existingUser))
  )()
}
