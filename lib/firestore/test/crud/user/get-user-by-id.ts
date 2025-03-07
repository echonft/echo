import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { getReferenceById } from '@echo/firestore/helpers/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/reference/get-reference-data'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

function getUserReferenceById(id: string): DocumentReference<UserDocument> {
  return getReferenceById({ collectionReference: usersCollection(), id })
}

export function getUserById(id: string): Promise<Nullable<UserDocument>> {
  return pipe(getUserReferenceById, getReferenceData)(id)
}
