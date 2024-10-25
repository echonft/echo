import { nftItemsCollectionSlug } from '@echo/model/helpers/item/nft-items-collection-slug'
import { swapNftItems } from '@echo/model/helpers/swap/swap-nft-items'
import type { Slug } from '@echo/model/types/slug'
import type { Swap } from '@echo/model/types/swap'
import { pipe } from 'ramda'

export function swapItemsCollectionSlug(swap: Swap): Slug[] {
  return pipe(swapNftItems, nftItemsCollectionSlug)(swap)
}
