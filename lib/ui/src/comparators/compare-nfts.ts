import type { Nft } from '@echo/model/types/nft'

export function compareNfts<T extends Nft>(nftA: T, nftB: T): number {
  return nftA.tokenId - nftB.tokenId
}
