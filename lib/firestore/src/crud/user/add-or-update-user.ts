import { getUserSnapshotByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { applySpec, identity, isNil, pipe, prop, toLower } from 'ramda'

export async function addOrUpdateUser(discordProfile: UserDocument['discord']): Promise<UserDocument> {
  const snapshot = await getUserSnapshotByDiscordId(discordProfile.id)
  if (isNil(snapshot)) {
    const user = applySpec<UserDocument>({
      username: pipe(prop('username'), toLower),
      discord: identity
    })(discordProfile)
    await setReference({
      collectionReference: usersCollection(),
      data: user
    })
    return user
  }
  return updateReference({
    collectionReference: usersCollection(),
    id: snapshot.id,
    data: { discord: discordProfile }
  })
}
