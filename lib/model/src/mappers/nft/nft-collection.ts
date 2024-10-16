import type { Collection } from '@echo/model/types/collection/collection'
import type { NftCollection } from '@echo/model/types/nft/nft'
import { pick } from 'ramda'

export function nftCollection(collection: Collection): NftCollection {
  return pick(['contract', 'name', 'slug', 'totalSupply'], collection)
}
