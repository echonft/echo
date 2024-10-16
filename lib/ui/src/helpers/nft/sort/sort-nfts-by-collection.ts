import { nftByCollectionComparator } from '@echo/model/helpers/nft/nft-by-collection-comparator'
import { nftByTokenIdComparator } from '@echo/model/helpers/nft/nft-by-token-id-comparator'
import type { Nft } from '@echo/model/types/nft/nft'
import { sortWith } from 'ramda'

export function sortNftsByCollection(nfts: Nft[]): Nft[] {
  return sortWith([nftByCollectionComparator, nftByTokenIdComparator], nfts)
}
