import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { User } from '@echo/model/types/user'
import { pipe } from 'ramda'

export function getAllUsers(): Promise<User[]> {
  return pipe(getUsersCollectionReference, getQueryData)()
}
