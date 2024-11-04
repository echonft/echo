import { addNonce } from '@echo/firestore/crud/nonce/add-nonce'
import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { NonceDocument } from '@echo/firestore/types/model/nonce-document'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { andThen, assoc, isNil, objOf, pipe } from 'ramda'

export interface AddUserArgs {
  user: Omit<UserDocument, 'wallet'>
  nonce: string
}

export interface AddUserReturn {
  user: NewDocument<UserDocument>
  nonce?: NewDocument<NonceDocument>
}

export async function addUser(args: AddUserArgs): Promise<AddUserReturn> {
  const snapshot = await getUserSnapshotByUsername(args.user.username)
  if (!isNil(snapshot)) {
    return { user: { id: snapshot.id, data: args.user } }
  }
  const userNewDocument = await pipe(
    setReference,
    andThen(pipe(objOf('id'), assoc('data', args.user)))
  )({
    collectionReference: usersCollection(),
    data: args.user
  })
  const nonceNewDocument = await addNonce({ nonce: args.nonce, userId: userNewDocument.id })
  return { user: userNewDocument, nonce: nonceNewDocument }
}
