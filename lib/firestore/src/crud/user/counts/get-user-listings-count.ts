import { getListingsForCreatorQuery } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getQueryCount } from '@echo/firestore/helpers/crud/query/get-query-count'
import type { Username } from '@echo/model/types/username'
import { pipe } from 'ramda'

export function getUserListingsCount(username: Username): Promise<number> {
  return pipe(getListingsForCreatorQuery, getQueryCount)(username)
}
