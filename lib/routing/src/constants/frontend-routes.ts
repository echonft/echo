import { FrontendRoute } from '@echo/routing/services/frontend/frontend-route'
import type { CreateListingQueryParams } from '@echo/routing/types/frontend/query-params/create-listing-query-params'
import type { CreateOfferQueryParams } from '@echo/routing/types/frontend/query-params/create-offer-query-params'
import type { SwapDetailsQueryParams } from '@echo/routing/types/frontend/query-params/swap-details-query-params'
import type { CreateListingSearchParams } from '@echo/routing/types/frontend/search-params/create-listing-search-params'
import type { CreateOfferSearchParams } from '@echo/routing/types/frontend/search-params/create-offer-search-params'
import type { SwapDetailsSearchParams } from '@echo/routing/types/frontend/search-params/swap-details-search-params'
import { createListingQueryParamsTransformSchema } from '@echo/routing/validators/frontend/listing/create-listing-query-params-transform-schema'
import { createOfferQueryParamsTransformSchema } from '@echo/routing/validators/frontend/offer/create-offer-query-params-transform-schema'
import { swapDetailsSearchParamsSchema } from '@echo/routing/validators/frontend/swap/swap-details-search-params-schema'

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
    details: new FrontendRoute<Record<'slug', Lowercase<string>>>('/listing/:slug', { secure: false })
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
    ),
    details: new FrontendRoute<Record<'slug', Lowercase<string>>>('/offer/:slug', { secure: false })
  },
  swap: {
    details: new FrontendRoute<never, SwapDetailsQueryParams, SwapDetailsSearchParams>(
      '/me',
      { secure: true },
      (params: SwapDetailsQueryParams) => swapDetailsSearchParamsSchema.parse(params)
    )
  },
  user: {
    details: new FrontendRoute<Record<'username', string>>('/user/:username', { secure: false }),
    profile: new FrontendRoute('/me', { secure: true })
  }
}
