import type { Collection } from '@echo/model/types/collection'

export function getNftCollectionSlug(nft: Record<'collection', Pick<Collection, 'slug'>>) {
  return nft.collection.slug
}
