import { getUserReferenceById } from '@echo/firestore/crud/user/get-user-by-id'
import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { getReferenceDocumentSnapshot } from '@echo/firestore/helpers/reference/get-reference-document-snapshot'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { UserError } from '@echo/model/constants/errors/user-error'
import { pipe } from 'ramda'

export async function updateUser(args: Record<'id', string> & Pick<UserDocument, 'discord'>): Promise<UserDocument> {
  const snapshot = await pipe(getUserReferenceById, getReferenceDocumentSnapshot)(args.id)
  if (!snapshot.exists) {
    return Promise.reject(Error(UserError.NotFound))
  }
  return updateReference({
    collectionReference: usersCollection(),
    id: snapshot.id,
    data: { discord: args.discord, username: args.discord.username }
  })
}
