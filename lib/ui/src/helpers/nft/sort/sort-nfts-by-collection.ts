import { nftByCollectionComparator } from '@echo/model/helpers/nft/nft-by-collection-comparator'
import { nftByTokenIdComparator } from '@echo/model/helpers/nft/nft-by-token-id-comparator'
import type { Nft } from '@echo/model/types/nft'
import { pipe, sort } from 'ramda'

export function sortNftsByCollection<T extends Nft>(nfts: T[]) {
  return pipe<[T[]], T[], T[]>(sort(nftByCollectionComparator), sort(nftByTokenIdComparator))(nfts)
}
