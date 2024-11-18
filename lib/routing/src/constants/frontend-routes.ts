import type { Slug } from '@echo/model/types/slug'
import { FrontendRoute } from '@echo/routing/services/frontend/frontend-route'
import type { ListingQueryParams } from '@echo/routing/types/frontend/query-params/listing-query-params'
import type { OfferQueryParams } from '@echo/routing/types/frontend/query-params/offer-query-params'
import type { SelectionQueryParams } from '@echo/routing/types/frontend/query-params/selection-query-params'
import type { ListingSearchParams } from '@echo/routing/types/frontend/search-params/listing-search-params'
import type { OfferSearchParams } from '@echo/routing/types/frontend/search-params/offer-search-params'
import type { SelectionSearchParams } from '@echo/routing/types/frontend/search-params/selection-search-params'
import { listingQueryParamsTransformSchema } from '@echo/routing/validators/frontend/listing/listing-query-params-transform-schema'
import { offerQueryParamsTransformSchema } from '@echo/routing/validators/frontend/offer/offer-query-params-transform-schema'
import { selectionQueryParamsTransformSchema } from '@echo/routing/validators/frontend/selection/selection-query-params-transform-schema'

export const frontendRoutes = {
  base: {
    home: new FrontendRoute('/', { secure: false })
  },
  collection: {
    all: new FrontendRoute('/collections', { secure: false }),
    details: new FrontendRoute<Record<'slug', Slug>, SelectionQueryParams, SelectionSearchParams>(
      '/collection/:slug',
      { secure: false },
      (params: SelectionQueryParams) => selectionQueryParamsTransformSchema.parse(params)
    )
  },
  listing: {
    create: new FrontendRoute<never, ListingQueryParams, ListingSearchParams>(
      '/listing',
      { secure: true },
      (params: ListingQueryParams) => listingQueryParamsTransformSchema.parse(params)
    )
  },
  login: {
    discord: new FrontendRoute('/login/discord', { secure: false }),
    join: new FrontendRoute('/login/join', { secure: false }),
    sign: new FrontendRoute('/login/sign', { secure: false }),
    wallet: new FrontendRoute('/login/wallet', { secure: false })
  },
  offer: {
    create: new FrontendRoute<never, OfferQueryParams, OfferSearchParams>(
      '/offer',
      { secure: true },
      (params: OfferQueryParams) => offerQueryParamsTransformSchema.parse(params)
    )
  },
  user: {
    details: new FrontendRoute<Record<'username', string>, SelectionQueryParams, SelectionSearchParams>(
      '/user/:username',
      { secure: false },
      (params: SelectionQueryParams) => selectionQueryParamsTransformSchema.parse(params)
    ),
    profile: new FrontendRoute<never, SelectionQueryParams, SelectionSearchParams>(
      '/me',
      { secure: true },
      (params: SelectionQueryParams) => selectionQueryParamsTransformSchema.parse(params)
    )
  }
}
