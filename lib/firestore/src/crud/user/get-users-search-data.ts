import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { querySelect } from '@echo/firestore/helpers/query/query-select'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { pipe } from 'ramda'

export function getUsersSearchData(): Promise<UserDocument[]> {
  return pipe(
    usersCollection,
    querySelect('username', 'discord'),
    queryOrderBy('username'),
    queryOrderBy('discord'),
    getQueryData
  )()
}
