import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { pipe } from 'ramda'

export function getAllUsers(): Promise<UserDocumentData[]> {
  return pipe(getUsersCollectionReference, getQueryData)()
}
