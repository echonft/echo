import type { CollectionIndex } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'

export interface ListingQueryParams extends QueryParams {
  items?: NftIndex[]
  target?: CollectionIndex
}
