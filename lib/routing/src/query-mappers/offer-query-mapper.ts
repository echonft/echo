import type { Collection } from '@echo/model/types/collection'
import { collectionQueryParam } from '@echo/routing/query-params/collection-query-param'
import { nftQueryParam } from '@echo/routing/query-params/nft-query-param'
import type { OfferQueryParams } from '@echo/routing/types/query-params/offer-query-params'
import type { OfferSearchParams } from '@echo/routing/types/search-params/offer-search-params'
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
