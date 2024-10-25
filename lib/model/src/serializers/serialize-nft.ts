import type { NftIndex } from '@echo/model/types/nft'

export function serializeNft(nft: NftIndex): string {
  return `${nft.collection.slug}.${nft.tokenId}`
}
