import { ApiPath } from '@echo/api/routing/api-path'

interface ListingPathArgs {
  listingId: string
}
interface OfferPathArgs {
  offerId: string
}

export const apiUrlProvider = {
  admin: {
    updateUser: new ApiPath({ path: '/admin/user/update', secure: true })
  },
  collection: {
    all: new ApiPath({ path: '/collections' })
  },
  listing: {
    cancel: new ApiPath<ListingPathArgs>({ path: '/listing/:listingId/cancel', secure: true }),
    create: new ApiPath({ path: '/listing', secure: true })
  },
  offer: {
    accept: new ApiPath<OfferPathArgs>({ path: '/offer/:offerId/accept', secure: true }),
    cancel: new ApiPath<OfferPathArgs>({ path: '/offer/:offerId/cancel', secure: true }),
    create: new ApiPath({ path: '/offer', secure: true }),
    reject: new ApiPath<OfferPathArgs>({ path: '/offer/:offerId/reject', secure: true }),
    signature: new ApiPath<OfferPathArgs>({ path: '/offer/:offerId/signature', secure: true }),
    validate: new ApiPath<OfferPathArgs>({ path: '/offer/:offerId/validate', secure: true })
  },
  profile: {
    nonce: new ApiPath({ path: '/profile/nonce', secure: true }),
    wallet: new ApiPath({ path: '/profile/wallet', secure: true }),
    wallets: new ApiPath({ path: '/profile/wallets', secure: true })
  }
}
