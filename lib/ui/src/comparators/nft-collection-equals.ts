import type { Nft } from '@echo/model/types/nft'

export function nftCollectionEquals(nftA: Nft, nftB: Nft) {
  return nftA.collection.name.localeCompare(nftB.collection.name)
}
