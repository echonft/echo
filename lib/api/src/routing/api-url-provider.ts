import { ApiPath } from '@echo/api/routing/api-path'

interface ListingPathArgs {
  slug: string
}

interface OfferPathArgs {
  slug: string
}

export const apiUrlProvider = {
  collection: {
    search: new ApiPath({ path: '/search/collection' })
  },
  listing: {
    cancel: new ApiPath<ListingPathArgs>({ path: '/listing/:slug/cancel', secure: true }),
    create: new ApiPath({ path: '/listing', secure: true })
  },
  offer: {
    accept: new ApiPath<OfferPathArgs>({ path: '/offer/:slug/accept', secure: true }),
    cancel: new ApiPath<OfferPathArgs>({ path: '/offer/:slug/cancel', secure: true }),
    create: new ApiPath({ path: '/offer', secure: true }),
    reject: new ApiPath<OfferPathArgs>({ path: '/offer/:slug/reject', secure: true })
  },
  profile: {
    nonce: new ApiPath({ path: '/profile/nonce', secure: true }),
    wallet: new ApiPath({ path: '/profile/wallet', secure: true }),
    wallets: new ApiPath({ path: '/profile/wallets', secure: true })
  },
  user: {
    search: new ApiPath({ path: '/search/user' }),
    update: new ApiPath({ path: '/user/update' })
  }
}
