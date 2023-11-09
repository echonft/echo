import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getUserQueryResults } from '@echo/firestore/helpers/crud/user/get-user-query-results'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { pipe } from 'ramda'

export async function getAllUsers(constraints?: QueryConstraints<UserDocumentData>) {
  return pipe(getUsersCollectionReference, getUserQueryResults(constraints))()
}
