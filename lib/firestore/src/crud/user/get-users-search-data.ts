import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { querySelect } from '@echo/firestore/helpers/crud/query/query-select'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { pipe } from 'ramda'

export function getUsersSearchData(): Promise<UserDocumentData[]> {
  return pipe(getUsersCollectionReference, querySelect('username', 'discord'), getQueryData)()
}
