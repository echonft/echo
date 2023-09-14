import type { Nft } from '@echo/ui/types/model/nft'

export function compareNftByCollection(nftA: Nft, nftB: Nft) {
  return nftA.collection.name.localeCompare(nftB.collection.name)
}
