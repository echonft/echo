import type { NftIndex } from '@echo/model/types/nft/nft'

export function nftCollectionSlug(nft: NftIndex) {
  return nft.collection.slug
}
