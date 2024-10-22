import { getOffersForUserQuery } from '@echo/firestore/crud/offer/get-offers-for-user'
import { getQueryCount } from '@echo/firestore/helpers/crud/query/get-query-count'
import { pipe } from 'ramda'

export function getUserOffersCount(username: string): Promise<number> {
  return pipe(getOffersForUserQuery, getQueryCount)(username)
}
