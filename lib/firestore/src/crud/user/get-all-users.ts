import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { pipe } from 'ramda'

export function getAllUsers(): Promise<UserDocument[]> {
  return pipe(usersCollection, getQueryData)()
}
