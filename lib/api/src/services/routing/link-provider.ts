import { Path } from '@echo/api/services/routing/path'

interface CollectionPathArgs {
  slug: string
}
interface ListingPathArgs {
  listingId: string
}
interface OfferPathArgs {
  offerId: string
}
interface UserPathArgs {
  username: string
}
export const linkProvider = {
  auth: {
    signIn: new Path({ path: '/auth/signin' })
  },
  base: {
    home: new Path({ path: '/' })
  },
  collection: {
    all: new Path({ path: '/collections' }),
    items: new Path<CollectionPathArgs>({ path: '/collection/:slug/items' }),
    listing: new Path<CollectionPathArgs & ListingPathArgs>({ path: '/collection/:slug/listing/:listingId' }),
    listings: new Path<CollectionPathArgs>({ path: '/collection/:slug/listings' }),
    swaps: new Path<CollectionPathArgs>({ path: '/collection/:slug/swaps' })
  },
  profile: {
    default: new Path({ path: '/me', secure: true }),
    items: new Path({ path: '/me/items', secure: true }),
    listings: new Path({ path: '/me/listings', secure: true }),
    listingsCreated: new Path({ path: '/me/listings/created', secure: true }),
    listingsReceived: new Path({ path: '/me/listings/pending', secure: true }),
    offer: new Path<OfferPathArgs>({ path: '/me/offer/:offerId', secure: true }),
    offers: new Path({ path: '/me/offers', secure: true }),
    offersCreated: new Path({ path: '/me/offers/created', secure: true }),
    offersReceived: new Path({ path: '/me/offers/pending', secure: true }),
    swaps: new Path({ path: '/me/swaps', secure: true })
  },
  user: {
    default: new Path<UserPathArgs>({ path: '/user/:username' }),
    items: new Path<UserPathArgs>({ path: '/user/:username/items' }),
    listings: new Path<UserPathArgs>({ path: '/user/:username/listings' }),
    swaps: new Path<UserPathArgs>({ path: '/user/:username/swaps' })
  }
}
