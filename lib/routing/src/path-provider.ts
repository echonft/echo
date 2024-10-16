import { Path } from '@echo/routing/path'
import { PathWithParams } from '@echo/routing/path-with-params'
import { listingQueryMapper } from '@echo/routing/query-mappers/listing-query-mapper'
import { offerQueryMapper } from '@echo/routing/query-mappers/offer-query-mapper'
import { selectionQueryMapper } from '@echo/routing/query-mappers/selection-query-mapper'
import type { ListingQueryParams } from '@echo/routing/types/query-params/listing-query-params'
import type { OfferQueryParams } from '@echo/routing/types/query-params/offer-query-params'
import type { SelectionQueryParams } from '@echo/routing/types/query-params/selection-query-params'
import type { ListingSearchParams } from '@echo/routing/types/search-params/listing-search-params'
import type { OfferSearchParams } from '@echo/routing/types/search-params/offer-search-params'
import type { SelectionSearchParams } from '@echo/routing/types/search-params/selection-search-params'
import type { Slug } from '@echo/model/types/slug'
import type { Username } from '@echo/model/types/username'

export const pathProvider = {
  auth: {
    signIn: new Path({ path: '/login', secure: false })
  },
  base: {
    home: new Path({ path: '/', secure: false })
  },
  collection: {
    all: new Path({ path: '/collections', secure: false }),
    default: new PathWithParams<Record<'slug', Slug>, SelectionQueryParams, SelectionSearchParams>({
      path: '/collection/:slug',
      secure: false,
      queryParamsMapper: selectionQueryMapper
    })
  },
  listing: {
    new: new Path<ListingQueryParams, ListingSearchParams>({
      path: '/listing',
      secure: true,
      queryParamsMapper: listingQueryMapper
    })
  },
  offer: {
    new: new Path<OfferQueryParams, OfferSearchParams>({
      path: '/offer',
      secure: true,
      queryParamsMapper: offerQueryMapper
    })
  },
  profile: {
    default: new Path<SelectionQueryParams, SelectionSearchParams>({
      path: '/me',
      secure: true,
      queryParamsMapper: selectionQueryMapper
    })
  },
  user: {
    default: new PathWithParams<Record<'username', Username>, SelectionQueryParams, SelectionSearchParams>({
      path: '/user/:username',
      secure: false,
      queryParamsMapper: selectionQueryMapper
    })
  }
}
