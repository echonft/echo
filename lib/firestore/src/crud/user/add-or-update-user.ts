import { getUserSnapshotByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import type { User } from '@echo/model/types/user'
import type { UserDiscordProfile } from '@echo/model/types/user/user-discord-profile'
import { applySpec, identity, isNil, pipe, prop, toLower } from 'ramda'

export async function addOrUpdateUser(discordProfile: UserDiscordProfile): Promise<User> {
  const snapshot = await getUserSnapshotByDiscordId(discordProfile.id)
  if (isNil(snapshot)) {
    const user = applySpec<UserDocumentData>({
      username: pipe(prop('username'), toLower),
      discord: identity
    })(discordProfile)
    await setReference({
      collectionReference: getUsersCollectionReference(),
      data: user
    })
    return user
  }
  return updateReference({
    collectionReference: getUsersCollectionReference(),
    id: snapshot.id,
    data: { discord: discordProfile }
  })
}
