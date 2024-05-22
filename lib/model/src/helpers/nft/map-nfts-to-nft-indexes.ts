import { mapNftToNftIndex } from '@echo/model/helpers/nft/map-nft-to-nft-index'
import { nftIndexComparator } from '@echo/model/helpers/nft/nft-index-comparator'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { map, pipe, sort } from 'ramda'

export function mapNftsToNftIndexes(nfts: Nft[]): NftIndex[] {
  return pipe(map(mapNftToNftIndex), sort(nftIndexComparator))(nfts)
}
