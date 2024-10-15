import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { mapToPartialWithFieldValue } from '@echo/firestore/mappers/map-to-partial-with-field-value'
import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import type { DiscordProfile } from '@echo/model/types/discord-profile'
import { isNil } from 'ramda'

export async function unchecked_updateUser(
  username: string,
  data: Omit<UserDocumentData, 'discord'> & Record<'discord', Partial<DiscordProfile>>
): Promise<UserDocumentData> {
  const snapshot = await getUserSnapshotByUsername(username)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`user with username ${username} does not exist`))
  }
  return updateReference({
    collectionReference: getUsersCollectionReference(),
    id: snapshot.id,
    data: mapToPartialWithFieldValue<UserDocumentData>(data)
  })
}
