import { Nft } from '../types/nft'

export function compareNftByCollection(nftA: Nft, nftB: Nft) {
  return nftA.collectionName.localeCompare(nftB.collectionName)
}
