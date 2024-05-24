import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getUserReferenceById(id: string): DocumentReference<UserDocumentData> {
  return getReferenceById<UserDocumentData>({ collectionReference: getUsersCollectionReference(), id })
}

export function getUserById(id: string): Promise<Nullable<UserDocumentData>> {
  return pipe(getUserReferenceById, getReferenceData<UserDocumentData>)(id)
}
