import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { nftIndexComparator } from '@echo/model/helpers/nft/nft-index-comparator'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { map, pipe, sort } from 'ramda'

export function getNftIndexForNfts(nfts: Nft[]): NftIndex[] {
  return pipe(map(getNftIndex), sort(nftIndexComparator))(nfts)
}
