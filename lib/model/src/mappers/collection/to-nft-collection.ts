import type { Collection } from '@echo/model/types/collection'
import type { NftCollection } from '@echo/model/types/nft'
import { pick } from 'ramda'

export function toNftCollection(collection: Collection): NftCollection {
  return pick(['contract', 'name', 'slug', 'totalSupply'], collection)
}
