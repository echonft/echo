import { getCreatedOffersForUserQuery } from '@echo/firestore/crud/offer/get-created-offers-for-user'
import { getQueryCount } from '@echo/firestore/helpers/query/get-query-count'
import type { Username } from '@echo/model/types/username'
import { pipe } from 'ramda'

export function getUserOffersCount(username: Username): Promise<number> {
  return pipe(getCreatedOffersForUserQuery, getQueryCount)(username)
}
