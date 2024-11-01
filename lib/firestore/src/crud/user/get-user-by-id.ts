import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { getReferenceById } from '@echo/firestore/helpers/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/reference/get-reference-data'
import { getReferenceDocumentSnapshot } from '@echo/firestore/helpers/reference/get-reference-document-snapshot'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getUserReferenceById(id: string): DocumentReference<UserDocument> {
  return getReferenceById({ collectionReference: usersCollection(), id })
}

export function getUserSnapshotById(id: string): Promise<DocumentSnapshot<UserDocument>> {
  return pipe(getUserReferenceById, getReferenceDocumentSnapshot)(id)
}

export function getUserById(id: string): Promise<Nullable<UserDocument>> {
  return pipe(getUserReferenceById, getReferenceData)(id)
}
