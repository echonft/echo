import { collectionQueryParam } from '@echo/api/routing/query-mappers/collection-query-param'
import { nftQueryParam } from '@echo/api/routing/query-mappers/nft-query-param'
import type { ListingQueryParams } from '@echo/api/types/routing/query-params/listing-query-params'
import type { ListingSearchParams } from '@echo/api/types/routing/search-params/listing-search-params'
import type { Collection } from '@echo/model/types/collection'
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
