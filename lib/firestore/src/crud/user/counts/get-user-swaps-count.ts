import { getSwapsForUserQuery } from '@echo/firestore/crud/swap/get-swaps-for-user'
import { getQueryCount } from '@echo/firestore/helpers/crud/query/get-query-count'
import { pipe } from 'ramda'

export function getUserSwapsCount(username: string): Promise<number> {
  return pipe(getSwapsForUserQuery, getQueryCount)(username)
}
