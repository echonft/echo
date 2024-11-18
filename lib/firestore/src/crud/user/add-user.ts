import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { andThen, assoc, isNil, objOf, pipe } from 'ramda'

export async function addUser(user: UserDocument): Promise<NewDocument<UserDocument>> {
  const snapshot = await getUserSnapshotByUsername(user.username)
  if (!isNil(snapshot)) {
    return { id: snapshot.id, data: user }
  }
  return pipe(
    setReference,
    andThen(pipe(objOf('id'), assoc('data', user)))
  )({
    collectionReference: usersCollection(),
    data: user
  })
}
