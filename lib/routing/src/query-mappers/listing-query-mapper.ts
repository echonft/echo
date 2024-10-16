import type { Collection } from '@echo/model/types/collection/collection'
import { collectionQueryParam } from '@echo/routing/query-params/collection-query-param'
import { nftQueryParam } from '@echo/routing/query-params/nft-query-param'
import type { ListingQueryParams } from '@echo/routing/types/query-params/listing-query-params'
import type { ListingSearchParams } from '@echo/routing/types/search-params/listing-search-params'
import { map, modify, pipe } from 'ramda'

export function listingQueryMapper(params: ListingQueryParams): ListingSearchParams {
  return pipe(
    modify('items', map(nftQueryParam)) as (
      obj: ListingQueryParams
    ) => Omit<ListingQueryParams, 'items'> & Pick<ListingSearchParams, 'items'>,
    modify<'target', Collection, string>('target', collectionQueryParam) as (
      obj: Omit<ListingQueryParams, 'items'> & Pick<ListingSearchParams, 'items'>
    ) => ListingSearchParams
  )(params)
}
