import { ApiPath } from '@echo/api/routing/api/api-path'
import type { HexString } from '@echo/utils/types/hex-string'

export const apiPathProvider = {
  collection: {
    search: new ApiPath({ path: '/search/collection', secure: false })
  },
  ipfs: {
    proxy: new ApiPath<{ path: string }>({ path: '/ipfs/:path', secure: false })
  },
  listing: {
    cancel: new ApiPath<Record<'slug', string>>({ path: '/listing/:slug/cancel', secure: true }),
    create: new ApiPath({ path: '/listing', secure: true })
  },
  offer: {
    getByIdContract: new ApiPath<Record<'idContract', HexString>>({
      path: '/offer/contract/:idContract',
      secure: true
    }),
    reject: new ApiPath<Record<'slug', string>>({ path: '/offer/:slug/reject', secure: true })
  },
  profile: {
    nonce: new ApiPath({ path: '/profile/nonce', secure: true }),
    wallet: new ApiPath({ path: '/profile/wallet', secure: true }),
    wallets: new ApiPath({ path: '/profile/wallets', secure: true })
  },
  user: {
    search: new ApiPath({ path: '/search/user', secure: false }),
    update: new ApiPath({ path: '/user/update', secure: false })
  },
  webhook: {
    echo: new ApiPath<Record<'chain', string>>({ path: '/webhook/:chain/echo', secure: false }),
    nftTransfer: new ApiPath<Record<'chain', string>>({ path: '/webhook/:chain/nft/transfer', secure: false })
  }
}
