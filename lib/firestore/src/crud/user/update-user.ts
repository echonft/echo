import { getUserSnapshotByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { now } from '@echo/utils/helpers/now'
import { assoc, isNil, pipe } from 'ramda'

export async function updateUser(data: Pick<UserDocumentData, 'discord'>): Promise<UserDocumentData> {
  const snapshot = await getUserSnapshotByDiscordId(data.discord.id)
  if (isNil(snapshot)) {
    const user = pipe(
      assoc('username', data.discord.username),
      assoc('createdAt', now()),
      assoc('updatedAt', now())
    )(data)
    await setReference<UserDocumentData>({
      collectionReference: getUsersCollectionReference(),
      data: user
    })
    return user
  }
  return updateReference<UserDocumentData>({
    collectionReference: getUsersCollectionReference(),
    id: snapshot.id,
    data
  })
}
