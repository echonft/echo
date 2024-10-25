import { getSwapsForUserQuery } from '@echo/firestore/crud/swap/get-swaps-for-user'
import { getQueryCount } from '@echo/firestore/helpers/query/get-query-count'
import type { Username } from '@echo/model/types/username'
import { pipe } from 'ramda'

export function getUserSwapsCount(username: Username): Promise<number> {
  return pipe(getSwapsForUserQuery, getQueryCount)(username)
}
