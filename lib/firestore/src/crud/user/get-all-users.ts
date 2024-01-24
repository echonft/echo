import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import type { User } from '@echo/firestore/types/model/user/user'
import { andThen, pipe } from 'ramda'

export async function getAllUsers() {
  return pipe(getUsersCollectionReference, getQuerySnapshot, andThen(getQuerySnapshotData<User>))()
}
