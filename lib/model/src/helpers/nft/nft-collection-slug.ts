import type { NftIndex } from '@echo/model/types/nft'

export function nftCollectionSlug<T extends NftIndex>(nft: T) {
  return nft.collection.slug
}
