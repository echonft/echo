import { nftItemCollectionSlug } from '@echo/model/helpers/item/nft-item-collection-slug'
import type { NftItem } from '@echo/model/types/item/nft-item'
import type { Slug } from '@echo/model/types/slug'
import { map, pipe, uniq } from 'ramda'

export function nftItemsCollectionSlug(item: NftItem[]): Slug[] {
  return pipe(map(nftItemCollectionSlug), uniq)(item)
}
