import { nftByCollectionComparator } from '@echo/model/helpers/nft/nft-by-collection-comparator'
import { nftByTokenIdComparator } from '@echo/model/helpers/nft/nft-by-token-id-comparator'
import type { Nft } from '@echo/model/types/nft'
import { sortWith } from 'ramda'

export function sortNftsByCollection(nfts: Nft[]) {
  // return sort(nftByCollectionComparator, nfts)
  return sortWith([nftByCollectionComparator, nftByTokenIdComparator], nfts)
}
