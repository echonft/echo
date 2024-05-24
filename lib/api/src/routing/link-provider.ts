import { Path } from '@echo/api/routing/path'

interface CollectionPathArgs {
  slug: string
}

interface ListingPathArgs {
  slug: string
}

interface OfferPathArgs {
  slug: string
}

interface UserPathArgs {
  username: string
}

export const linkProvider = {
  auth: {
    signIn: new Path({ path: '/login' })
  },
  base: {
    home: new Path({ path: '/' })
  },
  collection: {
    all: new Path({ path: '/collections' }),
    items: new Path<CollectionPathArgs>({ path: '/collection/:slug/items' }),
    listings: new Path<CollectionPathArgs>({ path: '/collection/:slug/listings' }),
    swaps: new Path<CollectionPathArgs>({ path: '/collection/:slug/swaps' })
  },
  listing: {
    details: new Path<ListingPathArgs>({ path: '/listing/:slug' }),
    new: new Path({ path: '/listing/new', secure: true })
  },
  offer: {
    details: new Path<OfferPathArgs>({ path: '/offer/:slug' }),
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
    default: new Path<UserPathArgs>({ path: '/user/:username' }),
    items: new Path<UserPathArgs>({ path: '/user/:username/items' }),
    listings: new Path<UserPathArgs>({ path: '/user/:username/listings' }),
    swaps: new Path<UserPathArgs>({ path: '/user/:username/swaps' })
  }
}
