import { ApiPath } from '@echo/api/services/routing/api-path'

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
export const apiUrlProvider = {
  admin: {
    updateUser: new ApiPath({ path: '/admin/user/update', secure: true })
  },
  collection: {
    all: new ApiPath({ path: '/collections' }),
    get: new ApiPath<CollectionPathArgs>({ path: '/collection/:slug' }),
    listings: new ApiPath<CollectionPathArgs>({ path: '/collection/:slug/listings' }),
    nft: new ApiPath<CollectionPathArgs & Record<'tokenId', number>>({ path: '/collection/:slug/item/:tokenId' }),
    nfts: new ApiPath<CollectionPathArgs>({ path: '/collection/:slug/items' }),
    swaps: new ApiPath<CollectionPathArgs>({ path: '/collection/:slug/swaps' })
  },
  listing: {
    all: new ApiPath({ path: '/listings' }),
    cancel: new ApiPath<ListingPathArgs>({ path: '/listing/:listingId/cancel', secure: true }),
    create: new ApiPath({ path: '/listing', secure: true }),
    get: new ApiPath<ListingPathArgs>({ path: '/listing/:listingId' })
  },
  offer: {
    accept: new ApiPath<OfferPathArgs>({ path: '/offer/:offerId/accept', secure: true }),
    cancel: new ApiPath<OfferPathArgs>({ path: '/offer/:offerId/cancel', secure: true }),
    create: new ApiPath({ path: '/offer', secure: true }),
    get: new ApiPath<OfferPathArgs>({ path: '/offer/:offerId', secure: true }),
    reject: new ApiPath<OfferPathArgs>({ path: '/offer/:offerId/reject', secure: true }),
    signature: new ApiPath<OfferPathArgs>({ path: '/offer/:offerId/signature', secure: true })
  },
  profile: {
    nonce: new ApiPath({ path: '/profile/nonce', secure: true }),
    offers: new ApiPath({ path: '/profile/offers', secure: true }),
    wallet: new ApiPath({ path: '/profile/wallet', secure: true })
  },
  swap: {
    all: new ApiPath({ path: '/swaps' })
  },
  user: {
    get: new ApiPath<UserPathArgs>({ path: '/user/:username' }),
    listings: new ApiPath<UserPathArgs>({ path: '/user/:username/listings' }),
    nfts: new ApiPath<UserPathArgs>({ path: '/user/:username/items' }),
    swaps: new ApiPath<UserPathArgs>({ path: '/user/:username/swaps' })
  }
}
