import { getNftsForOwnerQuery } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getQueryCount } from '@echo/firestore/helpers/crud/query/get-query-count'
import { pipe } from 'ramda'

export function getUserNftsCount(username: string): Promise<number> {
  return pipe(getNftsForOwnerQuery, getQueryCount)(username)
}
