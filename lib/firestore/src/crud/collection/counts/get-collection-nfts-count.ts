import { getNftsForCollectionQuery } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { getQueryCount } from '@echo/firestore/helpers/crud/query/get-query-count'
import type { Slug } from '@echo/model/types/slug'
import { pipe } from 'ramda'

export function getCollectionNftsCount(slug: Slug): Promise<number> {
  return pipe(getNftsForCollectionQuery, getQueryCount)(slug)
}
