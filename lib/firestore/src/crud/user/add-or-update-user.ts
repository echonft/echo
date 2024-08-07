import { getUserSnapshotByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { DiscordProfile } from '@echo/model/types/discord-profile'
import { applySpec, identity, isNil, pipe, prop, toLower } from 'ramda'

export async function addOrUpdateUser(profile: DiscordProfile): Promise<UserDocumentData> {
  const snapshot = await getUserSnapshotByDiscordId(profile.id)
  if (isNil(snapshot)) {
    const user = applySpec<UserDocumentData>({
      username: pipe(prop('username'), toLower),
      discord: identity
    })(profile)
    await setReference<UserDocumentData>({
      collectionReference: getUsersCollectionReference(),
      data: user
    })
    return user
  }
  return updateReference<UserDocumentData>({
    collectionReference: getUsersCollectionReference(),
    id: snapshot.id,
    data: { discord: profile }
  })
}
