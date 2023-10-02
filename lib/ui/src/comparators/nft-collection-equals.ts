import type { Nft } from '@echo/ui/types/model/nft'

export function nftCollectionEquals(nftA: Nft, nftB: Nft) {
  return nftA.collection.name.localeCompare(nftB.collection.name)
}
