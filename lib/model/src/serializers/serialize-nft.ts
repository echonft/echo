import type { NftIndex } from '@echo/model/types/nft/nft'

export function serializeNft(nft: NftIndex): string {
  return `${nft.collection.slug}.${nft.tokenId}`
}
