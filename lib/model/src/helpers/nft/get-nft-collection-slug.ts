import type { Nft } from '@echo/model/types/nft'

export function getNftCollectionSlug(nft: Nft) {
  return nft.collection.slug
}
