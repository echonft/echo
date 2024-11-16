import { getCreatedOffersForUserQuery } from '@echo/firestore/crud/offer/get-created-offers-for-user'
import { getQueryCount } from '@echo/firestore/helpers/query/get-query-count'
import { pipe } from 'ramda'

export function getUserOffersCount(username: string): Promise<number> {
  return pipe(getCreatedOffersForUserQuery, getQueryCount)(username)
}
