import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'

export function nftLabel(nft: Pick<Nft, 'tokenId'> & Record<'collection', Pick<Collection, 'totalSupply'>>): string {
  return `#${nft.tokenId.toString(10).padStart(Math.ceil(Math.log10(nft.collection.totalSupply)), '0')}`
}
