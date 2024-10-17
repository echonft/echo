import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { nftIndexComparator } from '@echo/model/helpers/nft/nft-index-comparator'
import type { Nft, NftIndex } from '@echo/model/types/nft/nft'
import { map, pipe, sort } from 'ramda'

export function getNftIndexForNfts(nfts: Nft[]): NftIndex[] {
  return pipe(map(nftIndex), sort(nftIndexComparator))(nfts)
}
