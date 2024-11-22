import { getNftsForCollectionQuery } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { getQueryCount } from '@echo/firestore/helpers/query/get-query-count'
import { pipe } from 'ramda'

export function getCollectionNftsCount(slug: Lowercase<string>): Promise<number> {
  return pipe(getNftsForCollectionQuery, getQueryCount)(slug)
}
