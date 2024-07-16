import { Path } from '@echo/api/routing/path'

export const pathProvider = {
  auth: {
    signIn: new Path({ path: '/login', secure: false })
  },
  base: {
    home: new Path({ path: '/', secure: false })
  },
  collection: {
    all: new Path({ path: '/collections', secure: false }),
    default: new Path<Record<'slug', string>>({ path: '/collection/:slug', secure: false }),
    items: new Path<Record<'slug', string>>({ path: '/collection/:slug/items', secure: false }),
    listings: new Path<Record<'slug', string>>({ path: '/collection/:slug/listings', secure: false }),
    swaps: new Path<Record<'slug', string>>({ path: '/collection/:slug/swaps', secure: false })
  },
  listing: {
    details: new Path<Record<'slug', string>>({ path: '/listing/:slug', secure: false }),
    new: new Path({ path: '/listing/new', secure: true })
  },
  offer: {
    details: new Path<Record<'slug', string>>({ path: '/offer/:slug', secure: true }),
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
    default: new Path<Record<'username', string>>({ path: '/user/:username', secure: false }),
    items: new Path<Record<'username', string>>({ path: '/user/:username/items', secure: false }),
    listings: new Path<Record<'username', string>>({ path: '/user/:username/listings', secure: false }),
    swaps: new Path<Record<'username', string>>({ path: '/user/:username/swaps', secure: false })
  },
  swap: {
    details: new Path<Record<'slug', string>>({ path: '/swap/:slug', secure: false })
  }
}
