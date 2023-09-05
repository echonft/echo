import { Nft } from '../types/nft'

export function compareNftByCollection(nftA: Nft, nftB: Nft) {
  return nftA.collection.name.localeCompare(nftB.collection.name)
}
