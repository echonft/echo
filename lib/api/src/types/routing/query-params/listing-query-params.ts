import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { CollectionIndex } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft'

export interface ListingQueryParams extends QueryParams {
  items?: NftIndex[]
  target?: CollectionIndex
}
