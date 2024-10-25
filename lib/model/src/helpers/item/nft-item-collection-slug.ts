import { itemToken } from '@echo/model/helpers/item/item-token'
import { nftCollectionSlug } from '@echo/model/helpers/nft/nft-collection-slug'
import type { NftItem } from '@echo/model/types/nft-item'
import type { Slug } from '@echo/model/types/slug'
import { pipe } from 'ramda'

export function nftItemCollectionSlug(item: NftItem): Slug {
  return pipe(itemToken, nftCollectionSlug)(item)
}
