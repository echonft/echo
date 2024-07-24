import { collectionQueryParam } from '@echo/api/routing/query-mappers/collection-query-param'
import { nftQueryParam } from '@echo/api/routing/query-mappers/nft-query-param'
import type { OfferQueryParams } from '@echo/api/types/routing/query-params/offer-query-params'
import type { OfferSearchParams } from '@echo/api/types/routing/search-params/offer-search-params'
import type { Collection } from '@echo/model/types/collection'
import { identity, is, juxt, map, modify, pipe, unless } from 'ramda'

export function offerQueryMapper(params: OfferQueryParams): OfferSearchParams {
  return pipe(
    modify('items', pipe(unless(is(Array), juxt([identity])), map(nftQueryParam))) as (
      obj: OfferQueryParams
    ) => Omit<OfferQueryParams, 'items'> & Pick<OfferSearchParams, 'items'>,
    modify<'target', Collection, string>('target', collectionQueryParam) as (
      obj: Omit<OfferQueryParams, 'items'> & Pick<OfferSearchParams, 'items'>
    ) => OfferSearchParams
  )(params)
}
