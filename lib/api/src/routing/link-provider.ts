import { Path } from '@echo/api/routing/path'

export const linkProvider = {
  auth: {
    signIn: new Path({ path: '/login' })
  },
  base: {
    home: new Path({ path: '/' })
  },
  collection: {
    all: new Path({ path: '/collections' }),
    items: new Path<Record<'slug', string>>({ path: '/collection/:slug/items' }),
    listings: new Path<Record<'slug', string>>({ path: '/collection/:slug/listings' }),
    swaps: new Path<Record<'slug', string>>({ path: '/collection/:slug/swaps' })
  },
  listing: {
    details: new Path<Record<'slug', string>>({ path: '/listing/:slug' }),
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
    default: new Path<Record<'username', string>>({ path: '/user/:username' }),
    items: new Path<Record<'username', string>>({ path: '/user/:username/items' }),
    listings: new Path<Record<'username', string>>({ path: '/user/:username/listings' }),
    swaps: new Path<Record<'username', string>>({ path: '/user/:username/swaps' })
  },
  swap: {
    details: new Path<Record<'slug', string>>({ path: '/swap/:slug' })
  }
}
