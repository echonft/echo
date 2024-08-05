import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { CollectionIndex } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft'

export interface OfferQueryParams extends QueryParams {
  items: NftIndex[] | NftIndex
  target?: CollectionIndex
}
