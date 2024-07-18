import { ApiPath } from '@echo/api/routing/api/api-path'
import { ApiPathWithParams } from '@echo/api/routing/api/api-path-with-params'
import type { Slug } from '@echo/model/types/slug'
import type { HexString } from '@echo/utils/types/hex-string'

export const apiPathProvider = {
  collection: {
    search: new ApiPath({ path: '/search/collection', secure: false })
  },
  ipfs: {
    proxy: new ApiPathWithParams<{ path: string }>({ path: '/ipfs/:path', secure: false })
  },
  listing: {
    cancel: new ApiPathWithParams<Record<'slug', Slug>>({ path: '/listing/:slug/cancel', secure: true }),
    create: new ApiPath({ path: '/listing', secure: true })
  },
  offer: {
    getByIdContract: new ApiPathWithParams<Record<'idContract', HexString>>({
      path: '/offer/contract/:idContract',
      secure: true
    }),
    reject: new ApiPathWithParams<Record<'slug', Slug>>({ path: '/offer/:slug/reject', secure: true })
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
    echo: new ApiPathWithParams<Record<'chain', string>>({ path: '/webhook/:chain/echo', secure: false }),
    nftTransfer: new ApiPathWithParams<Record<'chain', string>>({ path: '/webhook/:chain/nft/transfer', secure: false })
  }
}
