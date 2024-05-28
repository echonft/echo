import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { nftIndexComparator } from '@echo/model/helpers/nft/nft-index-comparator'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'

export function nftComparator<T extends Partial<Nft> & Required<NftIndex>>(nftA: T, nftB: T): number {
  return nftIndexComparator(getNftIndex(nftA), getNftIndex(nftB))
}
