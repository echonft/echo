import { getNftsForOwnerQuery } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getQueryCount } from '@echo/firestore/helpers/query/get-query-count'
import type { Username } from '@echo/model/types/username'
import { pipe } from 'ramda'

export function getUserNftsCount(username: Username): Promise<number> {
  return pipe(getNftsForOwnerQuery, getQueryCount)(username)
}
