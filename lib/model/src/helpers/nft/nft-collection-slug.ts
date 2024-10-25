import type { NftIndex } from '@echo/model/types/nft'

export function nftCollectionSlug(nft: NftIndex) {
  return nft.collection.slug
}
