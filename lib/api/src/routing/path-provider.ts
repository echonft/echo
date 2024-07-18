import { Path } from '@echo/api/routing/path'
import type { Offer } from '@echo/model/types/offer'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { WithSlugType } from '@echo/model/types/with-slug-type'
import type { WithUsername } from '@echo/model/types/with-username'
import type { WithUsernameType } from '@echo/model/types/with-username-type'

export const pathProvider = {
  auth: {
    signIn: new Path({ path: '/login', secure: false })
  },
  base: {
    home: new Path({ path: '/', secure: false })
  },
  collection: {
    all: new Path({ path: '/collections', secure: false }),
    default: new Path<WithSlug>({ path: '/collection/:slug', secure: false }),
    items: new Path<WithSlug>({ path: '/collection/:slug/items', secure: false }),
    listing: new Path<WithSlugType<Record<'listingSlug', string>>>({
      path: '/collection/:slug/listing/:listingSlug',
      secure: false
    }),
    listings: new Path<WithSlug>({ path: '/collection/:slug/listings', secure: false }),
    swaps: new Path<WithSlug>({ path: '/collection/:slug/swaps', secure: false })
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
    default: new Path<WithUsername>({ path: '/user/:username', secure: false }),
    items: new Path<WithUsername>({ path: '/user/:username/items', secure: false }),
    listings: new Path<WithUsername>({ path: '/user/:username/listings', secure: false }),
    offer: new Path<WithUsernameType<Pick<Offer, 'idContract'>>>({
      path: '/user/:username/offer/:idContract',
      secure: true
    }),
    swaps: new Path<WithUsername>({ path: '/user/:username/swaps', secure: false })
  },
  swap: {
    details: new Path<WithSlug>({ path: '/swap/:slug', secure: false })
  }
}
