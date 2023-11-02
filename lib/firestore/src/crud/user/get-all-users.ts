import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Query } from 'firebase-admin/firestore'

export async function getAllUsers(constraints?: QueryConstraints) {
  let query = getUsersCollectionReference() as Query<UserDocumentData>
  query = addConstraintsToQuery(query, constraints)
  return await getQueryDocumentsData(query)
}
