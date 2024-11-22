import { FrontendRoute } from '@echo/routing/services/frontend/frontend-route'
import type { CreateListingQueryParams } from '@echo/routing/types/frontend/query-params/create-listing-query-params'
import type { CreateOfferQueryParams } from '@echo/routing/types/frontend/query-params/create-offer-query-params'
import type { ListingDetailsQueryParams } from '@echo/routing/types/frontend/query-params/listing-details-query-params'
import type { SelectionQueryParams } from '@echo/routing/types/frontend/query-params/selection-query-params'
import type { CreateListingSearchParams } from '@echo/routing/types/frontend/search-params/create-listing-search-params'
import type { CreateOfferSearchParams } from '@echo/routing/types/frontend/search-params/create-offer-search-params'
import type { ListingDetailsSearchParams } from '@echo/routing/types/frontend/search-params/listing-details-search-params'
import type { SelectionSearchParams } from '@echo/routing/types/frontend/search-params/selection-search-params'
import { createListingQueryParamsTransformSchema } from '@echo/routing/validators/frontend/listing/create-listing-query-params-transform-schema'
import { listingDetailsSearchParamsSchema } from '@echo/routing/validators/frontend/listing/listing-details-search-params-schema'
import { createOfferQueryParamsTransformSchema } from '@echo/routing/validators/frontend/offer/create-offer-query-params-transform-schema'
import { selectionQueryParamsTransformSchema } from '@echo/routing/validators/frontend/selection/selection-query-params-transform-schema'

export const frontendRoutes = {
  base: {
    home: new FrontendRoute('/', { secure: false })
  },
  collection: {
    all: new FrontendRoute('/collections', { secure: false }),
    details: new FrontendRoute<Record<'slug', Lowercase<string>>>('/collection/:slug', { secure: false })
  },
  listing: {
    create: new FrontendRoute<never, CreateListingQueryParams, CreateListingSearchParams>(
      '/listing',
      { secure: true },
      (params: CreateListingQueryParams) => createListingQueryParamsTransformSchema.parse(params)
    ),
    details: new FrontendRoute<
      Record<'slug', Lowercase<string>>,
      ListingDetailsQueryParams,
      ListingDetailsSearchParams
    >('/collection/:slug', { secure: false }, (params: ListingDetailsQueryParams) =>
      listingDetailsSearchParamsSchema.parse(params)
    )
  },
  login: {
    discord: new FrontendRoute('/login/discord', { secure: false }),
    join: new FrontendRoute('/login/join', { secure: false }),
    sign: new FrontendRoute('/login/sign', { secure: false }),
    wallet: new FrontendRoute('/login/wallet', { secure: false })
  },
  offer: {
    create: new FrontendRoute<never, CreateOfferQueryParams, CreateOfferSearchParams>(
      '/offer',
      { secure: true },
      (params: CreateOfferQueryParams) => createOfferQueryParamsTransformSchema.parse(params)
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
