import type { Collection } from '@echo/model/types/collection'
import type { NftFilter } from '@echo/ui/types/nft-filter'

export interface CollectionFilter extends NftFilter {
  collection: Collection
}
