import { Path } from '@echo/api/routing/path'
import { PathWithParams } from '@echo/api/routing/path-with-params'
import { selectionQueryMapper } from '@echo/api/routing/query-mappers/selection-query-mapper'
import type { SelectionQueryParams } from '@echo/api/types/routing/query-params/selection-query-params'
import type { SelectionSearchParams } from '@echo/api/types/routing/search-params/selection-search-params'
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
    default: new PathWithParams<Record<'slug', Slug>>({ path: '/collection/:slug', secure: false }),
    items: new PathWithParams<Record<'slug', Slug>>({ path: '/collection/:slug/items', secure: false }),
    listing: new PathWithParams<{ slug: Slug; listingSlug: string }>({
      path: '/collection/:slug/listing/:listingSlug',
      secure: false
    }),
    listings: new PathWithParams<Record<'slug', Slug>>({ path: '/collection/:slug/listings', secure: false }),
    swaps: new PathWithParams<Record<'slug', Slug>>({ path: '/collection/:slug/swaps', secure: false })
  },
  listing: {
    new: new Path({ path: '/listing/new', secure: true })
  },
  offer: {
    new: new Path({ path: '/offer/new', secure: true })
  },
  profile: {
    default: new Path({ path: '/me', secure: true }),
    explore: new Path({ path: '/me/explore', secure: true }),
    items: new Path({ path: '/me/items', secure: true }),
    listings: new Path({ path: '/me/listings', secure: true }),
    offers: new Path({ path: '/me/offers', secure: true }),
    pendingOffers: new Path({ path: '/me/offers/pending', secure: true })
  },
  user: {
    default: new PathWithParams<Record<'username', Username>, SelectionQueryParams, SelectionSearchParams>({
      path: '/user/:username',
      secure: false,
      queryParamsMapper: selectionQueryMapper
    }),
    offer: new PathWithParams<{ username: Username; idContract: string }>({
      path: '/user/:username/offer/:idContract',
      secure: true
    })
  },
  swap: {
    details: new PathWithParams<Record<'slug', Slug>>({ path: '/swap/:slug', secure: false })
  }
}
