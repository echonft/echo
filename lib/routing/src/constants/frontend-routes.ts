import type { Slug } from '@echo/model/types/slug'
import type { Username } from '@echo/model/types/username'
import { FrontendRoute } from '@echo/routing/services/frontend/frontend-route'
import type { ListingQueryParams } from '@echo/routing/types/frontend/query-params/listing-query-params'
import type { OfferQueryParams } from '@echo/routing/types/frontend/query-params/offer-query-params'
import type { SelectionQueryParams } from '@echo/routing/types/frontend/query-params/selection-query-params'
import type { SignInQueryParams } from '@echo/routing/types/frontend/query-params/sign-in-query-params'
import type { ListingSearchParams } from '@echo/routing/types/frontend/search-params/listing-search-params'
import type { OfferSearchParams } from '@echo/routing/types/frontend/search-params/offer-search-params'
import type { SelectionSearchParams } from '@echo/routing/types/frontend/search-params/selection-search-params'
import { listingQueryParamsTransformSchema } from '@echo/routing/validators/frontend/listing/listing-query-params-transform-schema'
import { offerQueryParamsTransformSchema } from '@echo/routing/validators/frontend/offer/offer-query-params-transform-schema'
import { selectionQueryParamsTransformSchema } from '@echo/routing/validators/frontend/selection/selection-query-params-transform-schema'
import { signInQueryParamsSchema } from '@echo/routing/validators/frontend/sign-in/sign-in-query-params-schema'

export const frontendRoutes = {
  auth: {
    signIn: new FrontendRoute<never, SignInQueryParams, SignInQueryParams>(
      '/login',
      false,
      (params: SignInQueryParams) => signInQueryParamsSchema.parse(params)
    )
  },
  base: {
    home: new FrontendRoute('/', false)
  },
  collection: {
    all: new FrontendRoute('/collections', false),
    details: new FrontendRoute<Record<'slug', Slug>, SelectionQueryParams, SelectionSearchParams>(
      '/collection/:slug',
      false,
      (params: SelectionQueryParams) => selectionQueryParamsTransformSchema.parse(params)
    )
  },
  listing: {
    create: new FrontendRoute<never, ListingQueryParams, ListingSearchParams>(
      '/listing',
      true,
      (params: ListingQueryParams) => listingQueryParamsTransformSchema.parse(params)
    )
  },
  offer: {
    create: new FrontendRoute<never, OfferQueryParams, OfferSearchParams>('/offer', true, (params: OfferQueryParams) =>
      offerQueryParamsTransformSchema.parse(params)
    )
  },
  user: {
    details: new FrontendRoute<Record<'username', Username>, SelectionQueryParams, SelectionSearchParams>(
      '/user/:username',
      false,
      (params: SelectionQueryParams) => selectionQueryParamsTransformSchema.parse(params)
    ),
    profile: new FrontendRoute<never, SelectionQueryParams, SelectionSearchParams>(
      '/me',
      true,
      (params: SelectionQueryParams) => selectionQueryParamsTransformSchema.parse(params)
    )
  }
}
